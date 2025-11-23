import { RoleDto } from '@app/contracts/users/roles/dto';
import { Role } from '../../prisma/generated/client';

export class RoleMapper {
  static toRoleDto(roleModel: Role): RoleDto {
    return {
      id: roleModel.id,
      name: roleModel.name,
    };
  }
}
