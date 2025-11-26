import { Module } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { UsersRolesController } from './users-roles.controller';
import { UsersRolesRepository } from './users-roles.repository';
import { RolesModule } from '../roles/roles.module';
import { UsersInfoModule } from '../users-info/users-info.module';

@Module({
  imports: [RolesModule, UsersInfoModule],
  controllers: [UsersRolesController],
  providers: [UsersRolesService, UsersRolesRepository],
})
export class UsersRolesModule {}
