import { Module } from '@nestjs/common';
import { UsersInfoService } from './users-info.service';
import { UsersInfoController } from './users-info.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USERS_CLIENT } from '../../constants';
import { CookiesModule } from '../cookies/cookies.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: USERS_CLIENT,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.getOrThrow<number>('USERS_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    CookiesModule,
  ],
  controllers: [UsersInfoController],
  providers: [UsersInfoService],
})
export class UsersInfoModule {}
