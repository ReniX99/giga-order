import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterRequestDto } from '@app/contracts/users/auth/dto';
import { USERS_PATTERNS } from '@app/contracts/users/users-patterns';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(USERS_PATTERNS.REGISTER)
  async register(@Payload() dto: RegisterRequestDto) {
    return await this.authService.register(dto);
  }
}
