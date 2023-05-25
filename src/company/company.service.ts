import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const companyExists = await this.findOneByName(
      createCompanyDto.companyName,
    );

    if (companyExists) {
      throw new ConflictException();
    }

    return await this.companyRepo.save(createCompanyDto);
  }

  async findAll() {
    const companies = await this.companyRepo.find();

    if (!companies.length) {
      throw new NotFoundException('No record found');
    }

    return companies;
  }

  async findOneById(id: number) {
    return await this.companyRepo.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return await this.companyRepo.findOne({ where: { companyName: name } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyRepo.update(id, updateCompanyDto);
  }

  async remove(id: number) {
    return await this.companyRepo.delete(id);
  }
}
