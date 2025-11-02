import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../guards';

export const Authorization = () => {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard));
};
