import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credential.dto';
import { UserPayload } from './interface/user-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<UserPayload> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.usersRepository.loginUser(loginCredentialsDto);
  }

  async signOut(userId: string) {
    return this.usersRepository.logoutUser(userId);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    return this.usersRepository.refreshTokens(userId, refreshToken);
  }
}
