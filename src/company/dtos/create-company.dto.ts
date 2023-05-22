import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  fantasyName: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  regional: string;

  @IsNotEmpty()
  @IsDateString()
  openingDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @Type(() => Number)
  userId?: number;
}
