import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { CookiesModule } from './modules/cookies/cookies.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersInfoModule } from './modules/users-info/users-info.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CookiesModule,
    RolesModule,
    UsersInfoModule,
    OrdersModule,
  ],
})
export class ApiGatewayModule {}
