import { Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { PrismaService } from 'src/db/db.module';
import { ApiResource } from 'src/shared/http';

@Injectable()
export class BalanceService {
  constructor(private prismaService: PrismaService) {}
  async create(createBalanceDto: CreateBalanceDto) {
    return await this.prismaService.balance.create({ data: createBalanceDto });
  }

  findAll() {
    return this.prismaService.balance.findMany({
      include: { operation: true, user: true },
    });
  }

  async findOne(id: string) {
    const balance = await this.prismaService.balance.findFirst({
      where: { id },
      include: { operation: true, user: true },
    });

    return new ApiResource(balance).toJson();
  }

  async update(id: string, updateBalanceDto: UpdateBalanceDto) {
    return await this.prismaService.balance.update({
      where: { id },
      data: updateBalanceDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.balance.delete({ where: { id } });
  }
}
