import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
  imports: [ConfigModule.forRoot(), UsersModule],
})
export class ApiGatewayModule {}
