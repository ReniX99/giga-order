import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { RpcException } from '@nestjs/microservices';
import { Role } from 'apps/users/generated/prisma/client';
import { RoleDto } from '@app/contracts/users/roles/dto';
import { RoleMapper } from './mappers';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  isRoleNull(role: any): void {
    if (!role) {
      throw new RpcException({
        statusCode: 404,
        message: 'Role not found',
      });
    }
  }

  async getByName(name: string): Promise<Role> {
    const role = await this.rolesRepository.findByName(name);

    this.isRoleNull(role);

    return role!;
  }

  async getAll(): Promise<RoleDto[]> {
    const roles = await this.rolesRepository.getAll();

    const dto = roles.map((r) => RoleMapper.toRoleDto(r));
    return dto;
  }
}
