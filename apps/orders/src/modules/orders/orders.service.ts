import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import {
  CreateOrderMicroserviceDto,
  OrderDto,
} from '@app/contracts/orders/orders/dto';
import { OrderMapper } from './mappers';
import { StatusesService } from '../statuses/statuses.service';
import { TCreateOrder } from './types';

@Injectable()
export class OrdersService {
  newStatusName: string = 'Новая';

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly statusesService: StatusesService,
  ) {}

  async create(requestDto: CreateOrderMicroserviceDto): Promise<OrderDto> {
    const newStatus = await this.statusesService.getById(this.newStatusName);
    const newStatusId = newStatus.id;

    const order: TCreateOrder = OrderMapper.toCreateOrderType(
      requestDto,
      newStatusId,
    );

    const createdOrder = await this.ordersRepository.create(order);

    const responseDto = OrderMapper.toOrderDto(createdOrder);
    return responseDto;
  }
}
