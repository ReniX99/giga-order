import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderDto } from '@app/contracts/orders/orders/dto';
import { JwtInCookies } from '../../common/decorators';
import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @JwtInCookies()
  @Post()
  async create(
    @Body() dto: CreateOrderDto,
    @Req() request: Request,
  ): Promise<OrderDto> {
    return await this.ordersService.create(dto, request);
  }
}
