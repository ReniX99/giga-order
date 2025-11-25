import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AuthUserInfoDto,
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
} from '@app/contracts/users/auth/dto';
import { AUTH_PATTERNS } from '@app/contracts/users/auth/auth-patterns';
import { Authentication, User } from '../../common/decorators';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AUTH_PATTERNS.REGISTER)
  async register(@Payload() dto: RegisterRequestDto) {
    return await this.authService.register(dto);
  }

  @MessagePattern(AUTH_PATTERNS.LOGIN)
  async login(@Payload() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto);
  }

  @Authentication()
  @MessagePattern(AUTH_PATTERNS.AUTH)
  authorize(
    @User('id') userId: string,
    @User('roles') roles: string[],
  ): AuthUserInfoDto {
    return {
      userId,
      roles,
    };
  }
}
