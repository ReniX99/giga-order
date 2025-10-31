import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  RegisterRequestDto,
  RegisterResponseDto,
} from '@app/contracts/users/auth/dto';
import { USERS_PATTERNS } from '@app/contracts/users/users-patterns';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject(USERS_CLIENT) private usersClient: ClientProxy) {}

  async register(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const obsResponse = this.usersClient.send<RegisterResponseDto>(
      USERS_PATTERNS.REGISTER,
      dto,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }
}
