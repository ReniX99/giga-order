import { ProductDto } from '@app/contracts/orders/products/dto';
import { Product } from '../../prisma/generated/client';

export class ProductMapper {
  static toProductDto(product: Product): ProductDto {
    const { id, name, description, price } = product;
    return { id, name, description, price };
  }
}
