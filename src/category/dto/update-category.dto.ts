import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { CreateCategoryDto } from './create-category.dto';
import { OperationType } from 'src/operation/types/operation-types';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
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
