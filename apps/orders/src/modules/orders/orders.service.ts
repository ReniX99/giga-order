import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import {
  CreateOrderDto,
  OrderDto,
  OrderIdDto,
} from '@app/contracts/orders/orders/dto';
import { OrderMapper } from './mappers';
import { StatusesService } from '../statuses/statuses.service';
import { TCreateOrder } from './types';
import { RpcException } from '@nestjs/microservices';
import { OrderQuery } from '@app/contracts/orders/orders/query';

@Injectable()
export class OrdersService {
  newStatusName: string = 'Новая';

  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly statusesService: StatusesService,
  ) {}

  async create(requestDto: CreateOrderDto, userId: string): Promise<OrderDto> {
    const newStatus = await this.statusesService.getById(this.newStatusName);
    const newStatusId = newStatus.id;

    const order: TCreateOrder = OrderMapper.toCreateOrderType(
      requestDto,
      userId,
      newStatusId,
    );

    const createdOrder = await this.ordersRepository.create(order);

    const responseDto = OrderMapper.toOrderDto(createdOrder);
    return responseDto;
  }

  async getById(requestDto: OrderIdDto, userId: string): Promise<OrderDto> {
    const order = await this.ordersRepository.getById(requestDto.id);

    if (!order) {
      throw new RpcException({
        statusCode: 404,
        message: 'Order not found',
      });
    }

    if (order?.userId !== userId) {
      throw new RpcException({
        statusCode: 403,
        message: 'Forbidden order',
      });
    }

    const responseDto = OrderMapper.toOrderDto(order);
    return responseDto;
  }

  async getAll(query: OrderQuery, userId: string): Promise<OrderDto[]> {
    const orders = await this.ordersRepository.getAll(query, userId);

    const dto = orders.map((o) => OrderMapper.toOrderDto(o));
    return dto;
  }
}
