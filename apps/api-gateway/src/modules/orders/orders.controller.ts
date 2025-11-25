import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  CreateOrderDto,
  OrderDto,
  UpdateOrderStatusDto,
} from '@app/contracts/orders/orders/dto';
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

  @JwtInCookies()
  @Patch(':id')
  async updateStatus(
    @Param('id') orderId,
    @Body() dto: UpdateOrderStatusDto,
    @Req() request: Request,
  ) {
    return await this.ordersService.updateStatus(orderId, dto, request);
  }

  @JwtInCookies()
  @Patch('cancel/:id')
  async cancelOrder(
    @Param('id') orderId: string,
    @Req() request: Request,
  ): Promise<OrderDto> {
    return await this.ordersService.cancelOrder(orderId, request);
  }
}
