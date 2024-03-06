import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiResource } from 'src/shared/http';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from 'src/shared/constants';
import { RefreshToken, User } from 'src/shared/decorators';
import { UserResource } from 'src/user/resource/user-resource';
import { AuthGuard } from './auth.guard';
import { AuthResource } from './resource/auth-resource';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);

    new ApiResource(refreshToken, response).sendHttpOnlyCookie(
      REFRESH_TOKEN_COOKIE_NAME,
    );

    return AuthResource.toObject(accessToken);
  }

  @Post('/sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/logout')
  async logout(@User() userId: string) {
    await this.authService.logout(userId);

    return;
  }

  @Get('/refresh')
  async refresh(
    @RefreshToken() refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { newRefreshToken, newAccessToken } =
      await this.authService.refresh(refreshToken);

    new ApiResource(newRefreshToken, response).sendHttpOnlyCookie(
      REFRESH_TOKEN_COOKIE_NAME,
    );

    return AuthResource.toObject(newAccessToken);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@User() userId: string) {
    const user = await this.authService.getCurrentUser(userId);

    return UserResource.toObject(user);
  }
}
