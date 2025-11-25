import {
  Order,
  OrderProduct,
  Product,
  Status,
} from '../../prisma/generated/client';

export type OrderWithProducts = Order & {
  status: Status;
  products: (OrderProduct & {
    product: Product;
  })[];
};
