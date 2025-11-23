import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDERS_CLIENT) private readonly ordersClient: ClientProxy,
  ) {}
}
