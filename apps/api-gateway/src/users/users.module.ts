import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USERS_CLIENT } from './constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USERS_CLIENT,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.getOrThrow<number>('USERS_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
