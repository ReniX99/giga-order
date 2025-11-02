import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';

export const Authentication = () => {
  return applyDecorators(UseGuards(JwtAuthGuard));
};
