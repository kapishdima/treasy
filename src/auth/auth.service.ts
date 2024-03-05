import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserExistException } from 'src/shared/exceptions/http';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { Hash } from 'src/shared/encryption';
import { TokensService } from 'src/tokens/tokens.service';

import { LoginDto } from './dto/login.dto';
import { UserJwtPayload } from './models/jwt-payload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokensService: TokensService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUser(loginDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordIsValid = await Hash.checkHash(
      loginDto.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }

    const accessToken = this.tokensService.createAccessToken(
      new UserJwtPayload(user).toJson(),
    );

    const refreshToken = this.tokensService.createRefreshToken(
      new UserJwtPayload(user).toJson(),
    );

    await this.tokensService.storeRefreshToken(refreshToken);

    return { accessToken, refreshToken };
  }

  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.userService.getUser(createUserDto.email);

    if (candidate) {
      throw new UserExistException();
    }

    const encryptedPassword = await Hash.create(createUserDto.password);

    const createUserDtoWithHashedPassword = {
      ...createUserDto,
      password: encryptedPassword,
    };

    return this.userService.create(createUserDtoWithHashedPassword);
  }

  async logout(userId: string) {
    return this.tokensService.removeRefreshToken(userId);
  }

  async refresh(refreshToken: string) {
    const tokenDecodedData =
      await this.tokensService.vefiryRefreshToken(refreshToken);

    const newRefreshToken = await this.tokensService.updateRefreshToken(
      new UserJwtPayload(tokenDecodedData).toJson(),
    );

    const newAccessToken = this.tokensService.createAccessToken(
      new UserJwtPayload(tokenDecodedData).toJson(),
    );

    return { newAccessToken, newRefreshToken };
  }
}
