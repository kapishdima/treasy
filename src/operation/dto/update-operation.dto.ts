import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';

import { OperationType } from '../types/operation-types';
import { CreateOperationDto } from './create-operation.dto';

export class UpdateOperationDto extends PartialType(CreateOperationDto) {
  @ApiProperty({
    description: 'Operation amount',
    minimum: 1,
  })
  @IsInt()
  amount: number;

  @ApiProperty({
    description: 'Balance to which you need to add an operation',
  })
  @IsString()
  balanceId: string;

  @ApiProperty({
    enum: OperationType,
    description: 'Operation type',
  })
  @IsEnum(OperationType)
  type: OperationType;

  @ApiProperty({
    description: 'Operation category',
  })
  @IsString()
  categoryId: string;
}
