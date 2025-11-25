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

  async getById(id: number): Promise<Product | null> {
    return await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }

  async getByName(name: string): Promise<Product | null> {
    return await this.prismaService.product.findUnique({
      where: {
        name,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
