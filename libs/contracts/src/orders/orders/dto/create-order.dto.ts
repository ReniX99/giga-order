export class CreateOrderDto {
  products: CreateOrderProductDto[];
}

export class CreateOrderProductDto {
  id: number;

  count: number;
}

export class CreateOrderMicroserviceDto extends CreateOrderDto {
  userId: string;
}
