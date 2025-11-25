export class CreateOrderDto {
  products: CreateOrderProductDto[];
}

export class CreateOrderProductDto {
  id: number;

  count: number;
}
