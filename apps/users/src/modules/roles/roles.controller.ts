import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from '@app/contracts/users/roles/dto';
import { MessagePattern } from '@nestjs/microservices';
import { ROLES_PATTERNS } from '@app/contracts/users/roles/roles-patterns';
import { Authorization } from '../../common/decorators/authorization.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleEnum } from './enums';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(RoleEnum.USER)
  @Authorization()
  @MessagePattern(ROLES_PATTERNS.GET_ALL)
  async getAll(): Promise<RoleDto[]> {
    return this.rolesService.getAll();
  }
}
