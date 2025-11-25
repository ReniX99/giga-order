import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderWithProducts, TCreateOrder, TOrderFilter } from './types';

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

  async getAll(
    orderFilter: TOrderFilter,
    userId: string,
  ): Promise<OrderWithProducts[]> {
    const { status, page, count } = orderFilter;

    let skip: number = 0;
    if (page && count) {
      skip = (page - 1) * count;
    }

    return await this.prismaSerivce.order.findMany({
      where: {
        userId,
        status: {
          name: {
            contains: status,
            mode: 'insensitive',
          },
        },
      },
      orderBy: [
        {
          status: {
            name: 'asc',
          },
        },
        {
          createdAt: 'asc',
        },
      ],
      include: {
        status: true,
        products: {
          include: {
            product: true,
          },
        },
      },
      skip,
      take: count,
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

  async updateStatus(
    orderId: string,
    statusId: number,
  ): Promise<OrderWithProducts> {
    return await this.prismaSerivce.order.update({
      where: {
        id: orderId,
      },
      data: {
        statusId,
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
