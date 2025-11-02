import { Injectable } from '@nestjs/common';
import { UsersInfoRepository } from './users-info.repository';
import { UserInfoWithRoles } from './types';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersInfoService {
  constructor(private readonly usersInfoRepository: UsersInfoRepository) {}

  async findWithRolesById(id: string): Promise<UserInfoWithRoles> {
    const user = await this.usersInfoRepository.findById(id);

    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found',
      });
    }

    return user;
  }
}
