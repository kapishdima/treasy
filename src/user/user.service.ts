import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/db.module';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({ data: createUserDto });
  }

  async getUser(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }
}
