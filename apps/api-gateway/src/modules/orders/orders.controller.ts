import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderDto } from '@app/contracts/orders/orders/dto';
import { JwtInCookies } from '../../common/decorators';
import { Request } from 'express';
import { OrderQuery } from '@app/contracts/orders/orders/query';

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

  @JwtInCookies()
  @Get(':id')
  async getById(@Param('id') orderId: string, @Req() request: Request) {
    return await this.ordersService.getById(orderId, request);
  }

  @JwtInCookies()
  @Get()
  async getAll(@Query() query: OrderQuery, @Req() request: Request) {
    return await this.ordersService.getAll(query, request);
  }
}
