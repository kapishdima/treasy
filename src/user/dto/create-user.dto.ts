import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', minimum: 6 })
  @IsString()
  // @Min(6)
  password: string;
}
