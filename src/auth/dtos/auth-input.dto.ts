import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthInputDto {
  @ApiProperty({ description: 'Email for login', example: 'email@mail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for login', example: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
