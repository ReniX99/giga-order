import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '@app/contracts/users/auth/dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(response, dto);
  }
}
