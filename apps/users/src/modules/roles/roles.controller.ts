import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from '@app/contracts/users/roles/dto';
import { MessagePattern } from '@nestjs/microservices';
import { ROLES_PATTERNS } from '@app/contracts/users/roles/roles-patterns';
import { Authentication } from '../../common/decorators';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Authentication()
  @MessagePattern(ROLES_PATTERNS.GET_ALL)
  async getAll(): Promise<RoleDto[]> {
    return this.rolesService.getAll();
  }
}
