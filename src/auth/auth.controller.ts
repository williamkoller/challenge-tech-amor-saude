import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInputDto } from './dtos/auth-input.dto';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() data: AuthInputDto) {
    return await this.authService.signIn(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() request: Request) {
    return await this.userService.findOneById(request.user.id);
  }
}
