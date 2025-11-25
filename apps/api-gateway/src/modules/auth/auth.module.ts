import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USERS_CLIENT } from '../../constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
            host: configService.getOrThrow<string>('USERS_SERVICE_HOST'),
            port: configService.getOrThrow<number>('USERS_SERVICE_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    CookiesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
