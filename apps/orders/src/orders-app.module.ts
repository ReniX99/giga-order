import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { StatusesModule } from './modules/statuses/statuses.module';

@Module({
  imports: [PrismaModule, ProductsModule, OrdersModule, StatusesModule],
})
export class OrdersAppModule {}
