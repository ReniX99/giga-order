import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  AuthUserInfoDto,
  LoginMicroserviceResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '@app/contracts/users/auth/dto';
import { AUTH_PATTERNS } from '@app/contracts/users/auth/auth-patterns';
import { firstValueFrom } from 'rxjs';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';
import { CookiesService } from '../cookies/cookies.service';
import { RequestMessageDto } from '@app/contracts/shared/dto';

@Injectable()
export class AuthService {
  private COOKIE_NAME: string;
  private COOKIE_DOMAIN: string;
  private COOKIE_TTL: string;

  constructor(
    @Inject(USERS_CLIENT) private usersClient: ClientProxy,
    private configService: ConfigService,
    private readonly cookiesService: CookiesService,
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
    const obsResponse = this.usersClient.send<LoginMicroserviceResponseDto>(
      AUTH_PATTERNS.LOGIN,
      dto,
    );

    const response = await firstValueFrom(obsResponse);
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

  async authorize(request: Request): Promise<AuthUserInfoDto> {
    const token = this.cookiesService.getCookie(request, 'COOKIE_NAME');

    const requestMessage: RequestMessageDto<null> = {
      metadata: {
        token,
      },
    };

    const obsResponse = this.usersClient.send<AuthUserInfoDto>(
      AUTH_PATTERNS.AUTH,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }
}
