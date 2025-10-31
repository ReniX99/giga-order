import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  RegisterRequestDto,
  RegisterResponseDto,
} from '@app/contracts/users/auth/dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    return await this.usersService.create(dto);
  }
}
