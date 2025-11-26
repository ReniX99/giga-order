import { Controller } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { Authorization, Roles } from '../../common/decorators';
import { RoleEnum } from '@app/contracts/shared/enums';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USERS_ROLES_PATTERNS } from '@app/contracts/users/users-roles/users-roles-patterns';
import { UserRoleDto } from '@app/contracts/users/users-roles/dto';

@Controller('users-roles')
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @Roles(RoleEnum.ADMIN)
  @Authorization()
  @MessagePattern(USERS_ROLES_PATTERNS.CREATE)
  async create(@Payload('data') dto: UserRoleDto): Promise<boolean> {
    return await this.usersRolesService.create(dto);
  }
}
