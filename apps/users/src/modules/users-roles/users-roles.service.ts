import { Injectable } from '@nestjs/common';
import { UsersRolesRepository } from './users-roles.repository';
import { UserRoleDto } from '@app/contracts/users/users-roles/dto';
import { RolesService } from '../roles/roles.service';
import { UsersInfoService } from '../users-info/users-info.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersRolesService {
  constructor(
    private readonly usersRolesRepository: UsersRolesRepository,
    private readonly rolesService: RolesService,
    private readonly usersInfoService: UsersInfoService,
  ) {}

  async create(dto: UserRoleDto): Promise<boolean> {
    const { roleId, userId } = dto;

    const user = await this.usersInfoService.getWithRolesById(userId);

    await this.rolesService.getById(roleId);

    const existedRole = user.roles.find((r) => r.roleId === roleId);
    if (existedRole) {
      throw new RpcException({
        statusCode: 400,
        message: 'User role already exists',
      });
    }

    await this.usersRolesRepository.create(userId, roleId);
    return true;
  }

  async delete(dto: UserRoleDto): Promise<boolean> {
    const { roleId, userId } = dto;

    const userRole = await this.usersRolesRepository.getByIds(userId, roleId);

    if (!userRole) {
      throw new RpcException({
        statusCode: 404,
        message: 'User role not found',
      });
    }

    await this.usersRolesRepository.delete(userId, roleId);
    return true;
  }
}
