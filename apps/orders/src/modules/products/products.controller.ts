import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PRODUCTS_PATTERNS } from '@app/contracts/orders/products/products-patterns';
import {
  CreateProductDto,
  DeleteProductDto,
  ProductDto,
} from '@app/contracts/orders/products/dto';
import { Authorization, Roles } from '../../common/decorators';
import { RoleEnum } from '@app/contracts/shared/enums';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(RoleEnum.MANAGER)
  @Authorization()
  @MessagePattern(PRODUCTS_PATTERNS.CREATE)
  async create(@Payload('data') dto: CreateProductDto): Promise<ProductDto> {
    return await this.productsService.create(dto);
  }

  @MessagePattern(PRODUCTS_PATTERNS.GET_ALL)
  async getAll(): Promise<ProductDto[]> {
    return await this.productsService.getAll();
  }

  @Roles(RoleEnum.MANAGER)
  @Authorization()
  @MessagePattern(PRODUCTS_PATTERNS.DELETE)
  async delete(@Payload('data') dto: DeleteProductDto): Promise<boolean> {
    return await this.productsService.delete(dto);
  }
}
