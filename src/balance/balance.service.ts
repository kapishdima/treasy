import { Injectable } from '@nestjs/common';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { PrismaService } from 'src/db/db.module';
import { OperationTypes } from '@prisma/client';
import { MoneyService } from 'src/money/money.service';
import { CalculateBalanceDto } from './dto/calculate-balance.dto';

@Injectable()
export class BalanceService {
  constructor(
    private prismaService: PrismaService,
    private moneyService: MoneyService,
  ) {}
  async create(createBalanceDto: CreateBalanceDto) {
    return await this.prismaService.balance.create({ data: createBalanceDto });
  }

  findAll() {
    return this.prismaService.balance.findMany({
      include: { operation: true },
    });
  }

  findOne(id: string) {
    return this.prismaService.balance.findFirst({
      where: { id },
      include: { operation: true },
    });
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

  async calculateBalance({ balanceId, amount, type }: CalculateBalanceDto) {
    const balance = await this.findOne(balanceId);

    if (type === OperationTypes.ADDITION) {
      const operationResult = this.moneyService.add(balance.amount, amount);

      return this.update(balanceId, {
        amount: operationResult,
      });
    }

    if (type === OperationTypes.EXPENSE) {
      const operationResult = this.moneyService.sub(balance.amount, amount);

      return this.update(balanceId, {
        amount: operationResult,
      });
    }
  }
}
