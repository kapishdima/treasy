import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Min } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User email' })
  @IsString()
  // @Min(6)
  password: string;
}
