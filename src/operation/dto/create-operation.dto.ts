import { IsEnum, IsInt, IsString } from 'class-validator';
import { OperationType } from '../types/operation-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOperationDto {
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
