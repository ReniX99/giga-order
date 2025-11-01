import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  LoginMicroserviceResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '@app/contracts/users/auth/dto';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { TJwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';

@Injectable()
export class AuthService {
  private TOKEN_TTL: string;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.TOKEN_TTL = configService.getOrThrow<string>('TOKEN_TTL');
  }

  async register(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    return await this.usersService.create(dto);
  }

  async login(dto: LoginRequestDto): Promise<LoginMicroserviceResponseDto> {
    const { email, password } = dto;

    const errorStatusCode: number = 400;
    const errorMessage: string = 'Wrong email or password';

    const user = await this.usersService.findByEmail(
      email,
      errorStatusCode,
      errorMessage,
    );

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new RpcException({
        statusCode: errorStatusCode,
        message: errorMessage,
      });
    }

    const payload: TJwtPayload = {
      userId: user.id,
    };
    const token: string = await this.jwtService.signAsync(payload, {
      expiresIn: this.TOKEN_TTL as ms.StringValue,
    });

    return {
      id: user.id,
      token,
    };
  }
}
