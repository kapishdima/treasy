import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/db/db.module';

import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';

@Injectable()
export class OperationService {
  constructor(private prismaService: PrismaService) {}

  async create(createOperationDto: CreateOperationDto) {
    return await this.prismaService.operation.create({
      data: createOperationDto,
    });
  }

  findAll() {
    return this.prismaService.operation.findMany({
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
