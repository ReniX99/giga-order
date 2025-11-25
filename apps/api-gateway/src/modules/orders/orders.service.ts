import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateOrderDto,
  OrderDto,
  OrderIdDto,
} from '@app/contracts/orders/orders/dto';
import { ORDERS_PATTERNS } from '@app/contracts/orders/orders/orders-patterns';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { RequestOrdersMessageDto } from '@app/contracts/shared/dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_CLIENT) private readonly ordersClient: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateOrderDto, request: Request): Promise<OrderDto> {
    const userInfo = await this.authService.authorize(request);

    const requestMessage: RequestOrdersMessageDto<CreateOrderDto> = {
      data: dto,
      metadata: {
        user: {
          id: userInfo.userId,
          roles: userInfo.roles,
        },
      },
    };

    const obsResponse = this.ordersClient.send<OrderDto>(
      ORDERS_PATTERNS.CREATE,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }

  async getById(orderId: string, request: Request): Promise<OrderDto> {
    const userInfo = await this.authService.authorize(request);

    const dto: OrderIdDto = {
      id: orderId,
    };
    const requestMessage: RequestOrdersMessageDto<OrderIdDto> = {
      data: dto,
      metadata: {
        user: {
          id: userInfo.userId,
          roles: userInfo.roles,
        },
      },
    };

    const obsResponse = this.ordersClient.send<OrderDto>(
      ORDERS_PATTERNS.GET_BY_ID,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }
}
