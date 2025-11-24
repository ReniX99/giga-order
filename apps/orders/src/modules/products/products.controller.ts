import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PRODUCTS_PATTERNS } from '@app/contracts/orders/products/products-patterns';
import {
  CreateProductDto,
  ProductDto,
} from '@app/contracts/orders/products/dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(PRODUCTS_PATTERNS.CREATE)
  async create(@Payload() dto: CreateProductDto): Promise<ProductDto> {
    return await this.productsService.create(dto);
  }
}
