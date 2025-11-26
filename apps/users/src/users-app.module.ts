import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { ConfigModule } from '@nestjs/config';
import { UsersInfoModule } from './modules/users-info/users-info.module';
import { UsersRolesModule } from './modules/users-roles/users-roles.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    RolesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersInfoModule,
    UsersRolesModule,
  ],
})
export class UsersAppModule {}
