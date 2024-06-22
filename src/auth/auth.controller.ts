import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credential.dto';
import { UserPayload } from './interface/user-payload.interface';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserPayload> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginCredentialsDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: any, @Param('id') id: string) {
    this.authService.signOut(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: any) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
