import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiResource } from 'src/shared/http';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE_NAME } from 'src/shared/constants';
import { RefreshToken, User } from 'src/shared/decorators';
import { User as UserModel } from 'src/user/models/user';

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

    return new ApiResource({ accessToken }).toJson();
  }

  @Post('/sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    console.log('BODY', createUserDto);
    const user = await this.authService.signUp(createUserDto);

    return new ApiResource(user).toJson();
  }

  @Post('/logout')
  async logout(@User() userId: string) {
    await this.authService.logout(userId);

    return new ApiResource(null).toJson();
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

    return new ApiResource({ accessToken: newAccessToken }).toJson();
  }
}
