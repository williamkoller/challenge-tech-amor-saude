import {
  BadRequestException,
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
    try {
      return await this.userRepository.save({
        ...createUserDto,
        password: await this.bcryptAdapter.hash(createUserDto.password),
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `A user with that email: ${createUserDto.email} already exists`,
        );
      }

      throw new BadRequestException(error);
    }
  }

  async findAll(take: number, skip: number) {
    const takeRequest = take || 10;
    const skipRequest = skip || 0;

    const [data, total] = await this.userRepository.findAndCount({
      take: takeRequest,
      skip: skipRequest,
    });
    return {
      data,
      total,
    };
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
