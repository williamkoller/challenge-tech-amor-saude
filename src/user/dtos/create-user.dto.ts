import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Name to user', example: 'William' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email to user', example: 'william@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password to user', example: 'Q1w2e3r4t5y6' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
