import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/db/db.module';

import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { BalanceService } from 'src/balance/balance.service';

@Injectable()
export class OperationService {
  constructor(
    private prismaService: PrismaService,
    private balanceService: BalanceService,
  ) {}

  async create(createOperationDto: CreateOperationDto) {
    const operation = await this.prismaService.operation.create({
      data: createOperationDto,
    });

    this.balanceService.calculateBalance({
      balanceId: createOperationDto.balanceId,
      amount: createOperationDto.amount,
      type: createOperationDto.type,
    });

    return operation;
  }

  findAll({ sort, filters }: any = {}) {
    return this.prismaService.operation.findMany({
      orderBy: sort,
      where: filters,
      include: { category: true, balance: true },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.operation.findFirst({
      where: { id },
      include: {
        category: true,
        balance: true,
      },
    });
  }

  async update(id: number, updateOperationDto: UpdateOperationDto) {
    return await this.prismaService.operation.update({
      where: { id },
      data: updateOperationDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.operation.delete({
      where: { id },
    });
  }
}
