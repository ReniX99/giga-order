import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class CookiesService {
  constructor(private readonly configService: ConfigService) {}

  getCookie(request: Request, key: string): string {
    const cookieName = this.configService.getOrThrow<string>(key);

    return request.cookies[cookieName] as string;
  }
}
