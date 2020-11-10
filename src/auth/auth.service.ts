import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExternalUsersService } from '../external-users/external-users.service';
import { globalconstants } from '../constants';
import { InternalUsersService } from '../internal-users/internal-users.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private externalUsersService: ExternalUsersService,
    private internalUsersService: InternalUsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
    external: boolean = true,
  ): Promise<any> {
    let user;
    if (external) {
      user = await this.externalUsersService.findByEmail(username);
    } else {
      user = await this.internalUsersService.findByUsername(username);
    }
    let pass1 = bcrypt.hashSync(pass, globalconstants.saltRounds, null);
    if (user && bcrypt.compare(user.password, pass1)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
