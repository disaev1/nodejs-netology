import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/schemas/user.schema';
import { UsersService, UserData, validateUserPassword } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

export interface SigninResponse {
  access_token: string;
}

export interface UserJwtPayload {
  id: string;
  email: string;
  firstName: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
  
  public async validateUser(email: string, pass: string): Promise<User> {
    const user: User = await this.usersService.getUserByEmail(email);
    const passwordValidated = await validateUserPassword(user, pass)

    if (user && passwordValidated) {
      const { password, ...result } = user;

      return result as User;
    }

    return null;
  }

  public signin(user: UserData): SigninResponse {
    const payload: UserJwtPayload = { id: user.id, email: user.email, firstName: user.firstName };

    return { access_token: this.jwtService.sign(payload) };
  }

  public async signup(data: CreateUserDto): Promise<User> {
    const newUser: User = await this.usersService.create(data);

    return newUser;
  }
}
