import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TCreateProduct } from './types';
import { Product } from '../prisma/generated/client';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(product: TCreateProduct): Promise<Product> {
    const { name, description, price } = product;
    return await this.prismaService.product.create({
      data: {
        name,
        description,
        price,
      },
    });
  }

  async getAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
