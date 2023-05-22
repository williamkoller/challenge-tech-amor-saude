import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter {
  async hash(password: string): Promise<string> {
    return hashSync(password, 12);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash);
  }
}
