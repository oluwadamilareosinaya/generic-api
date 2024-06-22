import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { User } from '../user.entity';
import { UsersRepository } from '../users.repository';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user: User = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
