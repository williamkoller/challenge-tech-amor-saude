import { ConflictException, Injectable } from '@nestjs/common';
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
    return await this.companyRepo.find();
  }

  async findOneById(id: number) {
    return `This action returns a #${id} company`;
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
