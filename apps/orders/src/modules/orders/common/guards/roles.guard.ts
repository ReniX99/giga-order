import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '@app/contracts/shared/enums';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RpcException } from '@nestjs/microservices';
import { RequestOrdersMessageDto } from '@app/contracts/shared/dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler()],
    );

    if (!requiredRoles) return true;

    const { metadata } = context
      .switchToHttp()
      .getRequest<RequestOrdersMessageDto<any>>();

    const user = metadata.user;
    if (!user) return false;

    const isMatch = requiredRoles.some((r) => user.roles.includes(r));

    if (!isMatch) {
      throw new RpcException({
        statusCode: 403,
        message: 'Forbidden resouce',
      });
    }

    return true;
  }
}
