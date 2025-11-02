import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtInCookiesGuard } from '../guards';

export const JwtInCookies = () => {
  return applyDecorators(UseGuards(JwtInCookiesGuard));
};
