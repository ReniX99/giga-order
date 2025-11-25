import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ORDERS_PATTERNS } from '@app/contracts/orders/orders/orders-patterns';
import { CreateOrderDto, OrderDto } from '@app/contracts/orders/orders/dto';
import { Authorization, Roles, User } from '../../common/decorators';
import { RoleEnum } from '@app/contracts/shared/enums';

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
}
