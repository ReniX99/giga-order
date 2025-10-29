import { NestFactory } from '@nestjs/core';
import { UsersAppModule } from './users-app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersAppModule,
    {
      transport: Transport.TCP,
      options: {
        port: process.env.port as number | undefined,
      },
    },
  );
  await app.listen();
}
bootstrap();
