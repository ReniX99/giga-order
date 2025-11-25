import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  CancelOrderDto,
  CreateOrderDto,
  OrderDto,
  OrderIdDto,
  UpdateOrderStatusDto,
  UpdateOrderStatusMicroserviceDto,
} from '@app/contracts/orders/orders/dto';
import { ORDERS_PATTERNS } from '@app/contracts/orders/orders/orders-patterns';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { RequestOrdersMessageDto } from '@app/contracts/shared/dto';
import { OrderQuery } from '@app/contracts/orders/orders/query';

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

  async getAll(query: OrderQuery, request: Request): Promise<OrderDto[]> {
    const userInfo = await this.authService.authorize(request);

    const requestMessage: RequestOrdersMessageDto<OrderQuery> = {
      data: query,
      metadata: {
        user: {
          id: userInfo.userId,
          roles: userInfo.roles,
        },
      },
    };

    const obsResponse = this.ordersClient.send<OrderDto[]>(
      ORDERS_PATTERNS.GET_ALL,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }

  async updateStatus(
    orderId: string,
    dto: UpdateOrderStatusDto,
    request: Request,
  ): Promise<OrderDto> {
    const userInfo = await this.authService.authorize(request);

    const requestMessage: RequestOrdersMessageDto<UpdateOrderStatusMicroserviceDto> =
      {
        data: {
          orderId,
          statusId: dto.statusId,
        },
        metadata: {
          user: {
            id: userInfo.userId,
            roles: userInfo.roles,
          },
        },
      };

    const obsResponse = this.ordersClient.send<OrderDto>(
      ORDERS_PATTERNS.UPDATE_STATUS,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }

  async cancelOrder(orderId: string, request: Request): Promise<OrderDto> {
    const userInfo = await this.authService.authorize(request);

    const requestMessage: RequestOrdersMessageDto<CancelOrderDto> = {
      data: {
        orderId,
      },
      metadata: {
        user: {
          id: userInfo.userId,
          roles: userInfo.roles,
        },
      },
    };

    const obsResponse = this.ordersClient.send<OrderDto>(
      ORDERS_PATTERNS.CANCEL,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }
}
