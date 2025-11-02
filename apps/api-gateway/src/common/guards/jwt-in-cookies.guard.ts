import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInCookiesGuard implements CanActivate {
  private COOKIE_NAME: string;

  constructor(private configService: ConfigService) {
    this.COOKIE_NAME = configService.getOrThrow<string>('COOKIE_NAME');
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies[this.COOKIE_NAME] as string | undefined;
    if (!token) {
      throw new UnauthorizedException('Cookies not found');
    }

    return true;
  }
}
