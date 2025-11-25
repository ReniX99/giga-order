export class OrderDto {
  id: string;

  status: string;

  products: OrderProductDto[];

  price: number;
}

export class OrderProductDto {
  name: string;

  count: number;
}
