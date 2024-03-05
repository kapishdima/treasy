import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/db.module';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
