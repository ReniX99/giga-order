import { RequestOrdersMessageDto } from '@app/contracts/shared/dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const User = createParamDecorator(
  (data: 'id' | 'roles', context: ExecutionContext) => {
    const request = context
      .switchToRpc()
      .getData<RequestOrdersMessageDto<any>>();

    const user = request.metadata.user;

    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found',
      });
    }

    return data ? user[data] : user;
  },
);
