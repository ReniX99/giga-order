import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { RpcException } from '@nestjs/microservices';
import { Role } from 'apps/users/generated/prisma/client';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async findByName(name: string): Promise<Role> {
    const role = await this.rolesRepository.findByName(name);

    if (!role) {
      throw new RpcException({
        statusCode: 404,
        message: 'Role not found',
      });
    }

    return role;
  }
}
