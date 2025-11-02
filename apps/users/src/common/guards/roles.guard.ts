import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../modules/roles/enums';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler()],
    );

    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest<Request>();
    if (!user) return false;

    const isMatch = requiredRoles.some((r) =>
      (user['roles'] as string[]).includes(r),
    );

    if (!isMatch) {
      throw new RpcException({
        statusCode: 403,
        message: 'Forbidden resouce',
      });
    }

    return true;
  }
}
