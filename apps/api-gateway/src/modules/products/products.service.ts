import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateProductDto,
  ProductDto,
} from '@app/contracts/orders/products/dto';
import { PRODUCTS_PATTERNS } from '@app/contracts/orders/products/products-patterns';
import { firstValueFrom } from 'rxjs';
import { RequestOrdersMessageDto } from '@app/contracts/shared/dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ORDERS_CLIENT) private readonly ordersClient: ClientProxy,
    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateProductDto, request: Request): Promise<ProductDto> {
    const userInfo = await this.authService.authorize(request);
    const requestMessage: RequestOrdersMessageDto<CreateProductDto> = {
      data: dto,
      metadata: {
        user: {
          id: userInfo.userId,
          roles: userInfo.roles,
        },
      },
    };

    const obsResponse = this.ordersClient.send<ProductDto>(
      PRODUCTS_PATTERNS.CREATE,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }

  async getAll(): Promise<ProductDto[]> {
    const obsResponse = this.ordersClient.send<ProductDto[]>(
      PRODUCTS_PATTERNS.GET_ALL,
      {},
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }
}
