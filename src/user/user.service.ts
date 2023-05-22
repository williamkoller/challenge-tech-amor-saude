import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptAdapter } from 'src/shared/cryptography/bcrypt-adapter/bcrypt-adapter';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findOneByEmail(createUserDto.email);

    if (userExists) {
      throw new ConflictException(
        `A user with that email: ${createUserDto.email} already exists`,
      );
    }

    return await this.userRepository.save({
      ...createUserDto,
      password: await this.bcryptAdapter.hash(createUserDto.password),
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
