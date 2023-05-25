import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Company name',
    example: 'WILLIAM C KOLLER LTDA',
  })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({
    description: 'Fantasy name',
    example: 'WILLIAM C KOLLER LTDA',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fantasyName: string;

  @ApiProperty({
    description: 'CNPJ',
    example: '56.127.601/0001-14',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @ApiProperty({ description: 'Regional', example: 'PR' })
  @IsNotEmpty()
  @IsString()
  regional: string;

  @ApiProperty({
    description: 'Openging date',
    example: '2023-05-23T17:20:01.582Z',
  })
  @IsNotEmpty()
  @IsDateString()
  openingDate: Date;

  @ApiProperty({ description: 'Active', example: true })
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty({ description: 'User id', example: 2 })
  @IsOptional()
  @Type(() => Number)
  userId?: number;
}
