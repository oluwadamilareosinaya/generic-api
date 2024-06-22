import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credential.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from './interface/user-payload.interface';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class UsersRepository extends Repository<User> {
  private logger = new Logger();
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserPayload> {
    const { password } = authCredentialsDto;

    const hashedPassword = await this.hashData(password);

    const user = this.create({
      ...authCredentialsDto,
      password: hashedPassword,
    });

    try {
      await this.save(user);
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`User exists`);
      } else {
        this.logger.error(`Cannot create user`, error.stack);
        throw new InternalServerErrorException();
      }
    }
  }

  async loginUser(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<UserPayload> {
    const { email, password } = loginCredentialsDto;
    const user = await this.findOneBy({ email });

    if (user && (await argon2.verify(user.password, password))) {
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async logoutUser(userId: string) {
    return this.update(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, email: string) {
    const payload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.findOneBy({ id });

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied, no user or token');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches)
      throw new ForbiddenException('Access Denied, token mismatch');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
