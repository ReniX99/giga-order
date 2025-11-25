import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  ProductDto,
} from '@app/contracts/orders/products/dto';
import { JwtInCookies } from '../../common/decorators';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @JwtInCookies()
  @Post()
  async create(
    @Body() dto: CreateProductDto,
    @Req() request: Request,
  ): Promise<ProductDto> {
    return await this.productsService.create(dto, request);
  }

  @Get()
  async getAll(): Promise<ProductDto[]> {
    return await this.productsService.getAll();
  }

  @JwtInCookies()
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<void> {
    await this.productsService.delete(+id, request);
  }
}
