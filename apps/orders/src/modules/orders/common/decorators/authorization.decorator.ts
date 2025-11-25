import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';

export const Authorization = () => {
  return applyDecorators(UseGuards(RolesGuard));
};
