import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiCreatedResponse({
    description: 'Create new user',
    content: {
      'application/json': {
        example: {
          name: 'William Koller',
          email: 'williamk@mail.com',
          password: '$2b$12...',
          id: 2,
          createdAt: '2023-05-25T14:50:32.594Z',
          updatedAt: '2023-05-25T14:50:32.594Z',
        },
      },
    },
  })
  @ApiConflictResponse({
    description: 'A User with that email already exists',
    content: {
      'application/json': {
        example: {
          path: '/users',
          timestamp: '2023-05-25T14:51:05.597Z',
          errorList: {
            statusCode: 409,
            message: 'A user with that email: williamk@mail.com already exists',
            error: 'Conflict',
          },
        },
      },
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOkResponse({
    description: 'Find all users',
    content: {
      'application/json': {
        example: {
          data: [
            {
              id: 1,
              name: 'William Koller',
              email: 'williamkoller@mail.com',
              password:
                '$2b$12$rU.ECTO.hlt/Kyg7Fi98zOmOf00jITfaOtsHR4e.JcBjCjh9zOA/O',
              createdAt: '2023-05-22T18:51:57.653Z',
              updatedAt: '2023-05-25T15:07:06.086Z',
              companies: [
                {
                  id: 1,
                  companyName: 'William Koller LTDA',
                  fantasyName: 'William Koller LTDA',
                  cnpj: '04922628000103',
                  regional: 'PR',
                  openingDate: '2023-05-23',
                  active: true,
                  userId: 1,
                  createdAt: '2023-05-23T17:20:23.691Z',
                  updatedAt: '2023-05-23T17:20:23.691Z',
                },
              ],
            },
            {
              id: 3,
              name: 'William Koller',
              email: 'williamks@mail.com',
              password:
                '$2b$12$iO8xSSKvSJ9.0KRO32eGFux/yvumE/X2Nn.8IUKOsEdNgnuNu0wBe',
              createdAt: '2023-05-25T14:55:58.241Z',
              updatedAt: '2023-05-25T14:55:58.241Z',
              companies: [],
            },
          ],
          total: 2,
        },
      },
    },
  })
  async findAll(@Query() { take, skip }) {
    return await this.userService.findAll(take, skip);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOkResponse({
    description: 'Find user by id',
    content: {
      'application/json': {
        example: {
          id: 1,
          name: 'William Koller',
          email: 'williamkoller@mail.com',
          password:
            '$2b$12$rU.ECTO.hlt/Kyg7Fi98zOmOf00jITfaOtsHR4e.JcBjCjh9zOA/O',
          createdAt: '2023-05-22T18:51:57.653Z',
          updatedAt: '2023-05-25T15:07:06.086Z',
          companies: [
            {
              id: 1,
              companyName: 'William Koller LTDA',
              fantasyName: 'William Koller LTDA',
              cnpj: '04922628000103',
              regional: 'PR',
              openingDate: '2023-05-23',
              active: true,
              userId: 1,
              createdAt: '2023-05-23T17:20:23.691Z',
              updatedAt: '2023-05-23T17:20:23.691Z',
            },
          ],
        },
      },
    },
  })
  async findOne(@Param('id') id: number) {
    return await this.userService.findOneById(+id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Update user by id',
    content: {
      'application/json': {
        example: {
          id: 1,
          name: 'William Koller',
          email: 'williamkoller@mail.com',
          password:
            '$2b$12$rU.ECTO.hlt/Kyg7Fi98zOmOf00jITfaOtsHR4e.JcBjCjh9zOA/O',
          createdAt: '2023-05-22T18:51:57.653Z',
          updatedAt: '2023-05-25T15:07:06.086Z',
          companies: [
            {
              id: 1,
              companyName: 'William Koller LTDA',
              fantasyName: 'William Koller LTDA',
              cnpj: '04922628000103',
              regional: 'PR',
              openingDate: '2023-05-23',
              active: true,
              userId: 1,
              createdAt: '2023-05-23T17:20:23.691Z',
              updatedAt: '2023-05-23T17:20:23.691Z',
            },
          ],
        },
      },
    },
  })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiNoContentResponse({
    description: 'Remove user by id',
  })
  async remove(@Param('id') id: number) {
    return await this.userService.remove(+id);
  }
}
