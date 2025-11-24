import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateProductDto,
  ProductDto,
} from '@app/contracts/orders/products/dto';
import { PRODUCTS_PATTERNS } from '@app/contracts/orders/products/products-patterns';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ORDERS_CLIENT) private readonly ordersClient: ClientProxy,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductDto> {
    const obsResponse = this.ordersClient.send<ProductDto>(
      PRODUCTS_PATTERNS.CREATE,
      dto,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }
}
