import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderWithProducts, TCreateOrder } from './types';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async create(order: TCreateOrder): Promise<OrderWithProducts> {
    const { userId, statusId, products } = order;
    return await this.prismaSerivce.order.create({
      data: {
        userId,
        statusId,
        products: {
          createMany: {
            data: products.map((p) => ({
              productId: p.id,
              count: p.count,
            })),
          },
        },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        status: true,
      },
    });
  }

  async getById(id: string): Promise<OrderWithProducts | null> {
    return await this.prismaSerivce.order.findUnique({
      where: {
        id,
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        status: true,
      },
    });
  }
}
