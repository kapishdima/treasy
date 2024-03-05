import { PartialType } from '@nestjs/swagger';
import { CreateBalanceDto } from './create-balance.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBalanceDto extends PartialType(CreateBalanceDto) {
  @IsInt()
  amount: number;

  @IsOptional()
  @IsString()
  userId: string;
}
