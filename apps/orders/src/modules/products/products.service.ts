import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import {
  CreateProductDto,
  ProductDto,
} from '@app/contracts/orders/products/dto';
import { ProductMapper } from './mappers';

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
}
