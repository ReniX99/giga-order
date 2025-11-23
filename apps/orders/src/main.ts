import { NestFactory } from '@nestjs/core';
import { OrdersAppModule } from './orders-app.module';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersAppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: process.env.PORT as number | undefined,
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new RpcException(errors),
    }),
  );

  await app.listen();
}
bootstrap();
