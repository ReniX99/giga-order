import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import {
  CreateProductDto,
  DeleteProductDto,
  ProductDto,
} from '@app/contracts/orders/products/dto';
import { ProductMapper } from './mappers';
import { Product } from '../prisma/generated/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(requestDto: CreateProductDto): Promise<ProductDto> {
    const product = await this.productsRepository.create(requestDto);

    const responseDto = ProductMapper.toProductDto(product);
    return responseDto;
  }

  async getAll(): Promise<ProductDto[]> {
    const products = await this.productsRepository.getAll();

    return products.map((p) => ProductMapper.toProductDto(p));
  }

  async getById(id: number): Promise<Product> {
    const product = await this.productsRepository.getById(id);

    if (!product) {
      throw new RpcException({
        statusCode: 404,
        message: 'Product not found',
      });
    }

    return product;
  }

  async delete(dto: DeleteProductDto): Promise<boolean> {
    await this.getById(dto.id);
    await this.productsRepository.delete(dto.id);

    return true;
  }
}
