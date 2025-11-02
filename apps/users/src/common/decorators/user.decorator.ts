import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToRpc().getData<Request>();

    const user = request.user;
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found',
      });
    }

    return user[data];
  },
);
