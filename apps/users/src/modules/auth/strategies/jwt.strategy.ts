import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TJwtPayload, TJwtResponse } from '../types';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { RequestMessageDto } from '@app/contracts/shared/dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (payload: RequestMessageDto<any>) => {
          return payload.metadata.token;
        },
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET_KEY'),
    });
  }

  validate(payload: TJwtPayload): Promise<TJwtResponse> {
    return this.authService.validateToken(payload);
  }
}
