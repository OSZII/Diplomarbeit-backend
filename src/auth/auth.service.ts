import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
