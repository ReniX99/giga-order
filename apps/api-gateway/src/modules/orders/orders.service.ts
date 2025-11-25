import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateOrderDto,
  CreateOrderMicroserviceDto,
  OrderDto,
} from '@app/contracts/orders/orders/dto';
import { ORDERS_PATTERNS } from '@app/contracts/orders/orders/orders-patterns';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_CLIENT) private readonly ordersClient: ClientProxy,
  ) {}

  async create(dto: CreateOrderDto): Promise<OrderDto> {
    const microserviceDto: CreateOrderMicroserviceDto = {
      products: dto.products,
      userId: '61368433-b001-41c6-b8d8-1d597468fc39',
    };
    const obsResponse = this.ordersClient.send<OrderDto>(
      ORDERS_PATTERNS.CREATE,
      microserviceDto,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }
}
