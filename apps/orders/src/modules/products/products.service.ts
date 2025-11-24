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
}
