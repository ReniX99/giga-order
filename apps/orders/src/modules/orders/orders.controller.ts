import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ORDERS_PATTERNS } from '@app/contracts/orders/orders/orders-patterns';
import {
  CreateOrderMicroserviceDto,
  OrderDto,
} from '@app/contracts/orders/orders/dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(ORDERS_PATTERNS.CREATE)
  async create(@Payload() dto: CreateOrderMicroserviceDto): Promise<OrderDto> {
    return await this.ordersService.create(dto);
  }
}
