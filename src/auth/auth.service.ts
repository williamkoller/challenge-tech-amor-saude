import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthInputDto } from './dtos/auth-input.dto';
import { UserService } from '../user/user.service';
import { BcryptAdapter } from '../shared/cryptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '../shared/jwt/jwt-adapter';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtAdapter: JwtAdapter,
  ) {}
  async signIn(data: AuthInputDto) {
    const userHasSignIn = await this.userService.findOneByEmail(data.email);

    if (!userHasSignIn) {
      throw new NotFoundException('User not found');
    }

    const validPassword = await this.bcryptAdapter.compare(
      data.password,
      userHasSignIn.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const payload = {
      sub: userHasSignIn.id,
      name: userHasSignIn.name,
    };

    const accessToken = await this.jwtAdapter.sign(payload);

    return {
      accessToken,
    };
  }
}
