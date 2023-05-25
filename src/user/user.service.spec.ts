import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptAdapter } from '../shared/cryptography/bcrypt-adapter/bcrypt-adapter';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ConflictException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let bcryptAdapter: BcryptAdapter;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        BcryptAdapter,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    bcryptAdapter = module.get<BcryptAdapter>(BcryptAdapter);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined service', () => {
    expect(service).toBeDefined();
  });

  it('should be a create user', async () => {
    const hash = await bcryptAdapter.hash('any_password');
    jest.spyOn(bcryptAdapter, 'hash').mockImplementation(async () => hash);
    const createUserDto: CreateUserDto = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    repository.findOne = jest.fn().mockResolvedValue(createUserDto.email);
    service.create = jest
      .fn()
      .mockResolvedValue(
        new ConflictException(
          `A user with that email: ${createUserDto.email} already exists`,
        ),
      );

    const user = await service.create({
      ...createUserDto,
      password: hash,
    });
    expect(user).toStrictEqual(
      new ConflictException(
        'A user with that email: any_email@mail.com already exists',
      ),
    );
  });
});
