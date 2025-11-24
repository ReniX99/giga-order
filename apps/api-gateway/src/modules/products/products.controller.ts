import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  ProductDto,
} from '@app/contracts/orders/products/dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<ProductDto> {
    return await this.productsService.create(dto);
  }

  @Get()
  async getAll(): Promise<ProductDto[]> {
    return await this.productsService.getAll();
  }
}
