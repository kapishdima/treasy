import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from 'src/auth/models/jwt-payload';
import { PrismaService } from 'src/db/db.module';

@Injectable()
export class TokensService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  public createAccessToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPERIS_TIME,
    });
  }

  public createRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPERIS_TIME,
    });
  }

  public async storeRefreshToken(token: string) {
    try {
      const tokenDecodedData = await this.vefiryRefreshToken(token);

      return this.prismaService.refreshToken.create({
        data: { token, userId: tokenDecodedData.id },
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  public async removeRefreshToken(userId: string) {
    const refreshToken = await this.prismaService.refreshToken.findFirst({
      where: { userId },
    });

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    return this.prismaService.refreshToken.delete({
      where: { id: refreshToken.id },
    });
  }

  async updateRefreshToken(payload: JwtPayload) {
    try {
      const refreshToken = await this.prismaService.refreshToken.findFirst({
        where: { userId: payload.id },
      });

      if (!refreshToken) {
        throw new UnauthorizedException();
      }

      const newRefreshToken = this.createRefreshToken(payload);

      await this.prismaService.refreshToken.update({
        where: { id: refreshToken.id },
        data: { token: newRefreshToken },
      });

      return newRefreshToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  public async vefiryRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
