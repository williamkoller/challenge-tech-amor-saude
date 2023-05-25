import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptAdapter } from '../shared/cryptography/bcrypt-adapter/bcrypt-adapter';

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
    const users = await this.userRepository.find();
    return users.length ? users : [];
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = await this.findOneById(id);

    if (updateUserDto?.password) {
      const dataUpdate = {
        ...updateUserDto,
        password: await this.bcryptAdapter.hash(updateUserDto.password),
      };

      user = this.userRepository.merge(user, dataUpdate);

      return await this.userRepository.save(user);
    }

    user = this.userRepository.merge(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
