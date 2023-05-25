import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignInInterface } from './interfaces/jwt-sign-in.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAdapter {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async sign(data: JwtSignInInterface): Promise<string> {
    return await this.jwtService.signAsync(data);
  }

  async verify(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
