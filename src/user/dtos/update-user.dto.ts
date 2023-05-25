import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Name to user', example: 'William' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Email to user', example: 'william@mail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Password to user', example: 'Q1w2e3r4t5' })
  @IsOptional()
  @IsString()
  password?: string;
}
