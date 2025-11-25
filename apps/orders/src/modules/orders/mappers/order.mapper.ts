import { CreateOrderDto, OrderDto } from '@app/contracts/orders/orders/dto';
import { OrderWithProducts, TCreateOrder } from '../types';

export class OrderMapper {
  static toOrderDto(order: OrderWithProducts): OrderDto {
    const { id, status, products } = order;
    return {
      id,
      status: status.name,
      products: products.map((p) => ({
        name: p.product.name,
        count: p.count,
      })),
      price: products.reduce((sum, p) => sum + p.product.price * p.count, 0),
    };
  }

  static toCreateOrderType(
    dto: CreateOrderDto,
    userId: string,
    statusId: number,
  ): TCreateOrder {
    const { products } = dto;
    return {
      userId,
      statusId,
      products,
    };
  }
}
