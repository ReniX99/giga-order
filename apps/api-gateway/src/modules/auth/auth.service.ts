import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  LoginMicroserviceResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '@app/contracts/users/auth/dto';
import { AUTH_PATTERNS } from '@app/contracts/users/auth/auth-patterns';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  private COOKIE_NAME: string;
  private COOKIE_DOMAIN: string;
  private COOKIE_TTL: string;

  constructor(
    @Inject(USERS_CLIENT) private usersClient: ClientProxy,
    private configService: ConfigService,
  ) {
    this.COOKIE_NAME = configService.getOrThrow<string>('COOKIE_NAME');
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
    this.COOKIE_TTL = configService.getOrThrow<string>('COOKIE_TTL');
  }

  async register(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const obsResponse = this.usersClient.send<RegisterResponseDto>(
      AUTH_PATTERNS.REGISTER,
      dto,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }

  async login(
    httpResponse: Response,
    dto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const objResponse = this.usersClient.send<LoginMicroserviceResponseDto>(
      AUTH_PATTERNS.LOGIN,
      dto,
    );

    const response = await firstValueFrom(objResponse);
    const { token } = response;

    this.setCookies(
      httpResponse,
      token,
      this.COOKIE_NAME,
      ms(this.COOKIE_TTL as ms.StringValue),
    );

    return {
      id: response.id,
    };
  }

  private setCookies(
    response: Response,
    token: string,
    cookieName: string,
    age: number,
  ) {
    response.cookie(cookieName, token, {
      httpOnly: true,
      sameSite: 'lax',
      domain: this.COOKIE_DOMAIN,
      maxAge: age,
    });
  }
}
