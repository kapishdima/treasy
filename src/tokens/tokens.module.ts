import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { PrismaService } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [TokensService, PrismaService],
  exports: [TokensService],
})
export class TokensModule {}
