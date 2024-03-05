import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { OperationType } from 'src/operation/types/operation-types';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name' })
  @IsString()
  name: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({
    description: 'Category planned amount',
    required: false,
    default: 0,
  })
  plannedAmount: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Include category into budget',
    required: false,
    default: false,
  })
  includedInBudget: boolean;

  @IsEnum(OperationType)
  @ApiProperty({ description: 'Category type' })
  type: OperationType;
}
