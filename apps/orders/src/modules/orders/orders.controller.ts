import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ORDERS_PATTERNS } from '@app/contracts/orders/orders/orders-patterns';
import {
  CreateOrderDto,
  OrderDto,
  OrderIdDto,
  UpdateOrderStatusMicroserviceDto,
} from '@app/contracts/orders/orders/dto';
import { Authorization, Roles, User } from '../../common/decorators';
import { RoleEnum } from '@app/contracts/shared/enums';
import { OrderQuery } from '@app/contracts/orders/orders/query';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(RoleEnum.USER)
  @Authorization()
  @MessagePattern(ORDERS_PATTERNS.CREATE)
  async create(
    @Payload('data') dto: CreateOrderDto,
    @User('id') userId: string,
  ): Promise<OrderDto> {
    return await this.ordersService.create(dto, userId);
  }

  @Roles(RoleEnum.USER)
  @Authorization()
  @MessagePattern(ORDERS_PATTERNS.GET_BY_ID)
  async getById(
    @Payload('data') dto: OrderIdDto,
    @User('id') userId: string,
  ): Promise<OrderDto> {
    return await this.ordersService.getById(dto, userId);
  }

  @Roles(RoleEnum.USER)
  @Authorization()
  @MessagePattern(ORDERS_PATTERNS.GET_ALL)
  async getAll(@Payload('data') query: OrderQuery, @User('id') userId: string) {
    return await this.ordersService.getAll(query, userId);
  }

  @Roles(RoleEnum.MANAGER)
  @Authorization()
  @MessagePattern(ORDERS_PATTERNS.UPDATE_STATUS)
  async updateStatus(@Payload('data') dto: UpdateOrderStatusMicroserviceDto) {
    return await this.ordersService.updateStatus(dto);
  }
}
