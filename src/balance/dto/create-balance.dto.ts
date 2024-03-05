import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBalanceDto {
  @IsInt()
  amount: number;

  @IsOptional()
  @IsString()
  userId: string;
}
