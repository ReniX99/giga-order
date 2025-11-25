import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderDto } from '@app/contracts/orders/orders/dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<OrderDto> {
    return await this.ordersService.create(dto);
  }
}
