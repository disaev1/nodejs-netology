import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';

import { AuthService, SigninResponse } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';

interface RequestWithUser extends Request {
  user: User;
}

interface SignupResponse {
  status: string;
}

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupData: CreateUserDto): Promise<SignupResponse> {
    const newUser: User = await this.authService.signup(signupData);

    return { status: `Successfully created user "${newUser.email}."` };
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req: RequestWithUser): SigninResponse {
    return this.authService.signin(req.user);
  }
}
