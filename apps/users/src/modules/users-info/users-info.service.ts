import { Injectable } from '@nestjs/common';
import { UsersInfoRepository } from './users-info.repository';
import { RpcException } from '@nestjs/microservices';
import { UserInfoWithRoles } from './types';

@Injectable()
export class UsersInfoService {
  constructor(private readonly usersInfoRepository: UsersInfoRepository) {}

  isUserNull(user: any): void {
    if (!user) {
      throw new RpcException({
        statusCode: 404,
        message: 'User not found',
      });
    }
  }

  async getWithRolesById(id: string): Promise<UserInfoWithRoles> {
    const user = await this.usersInfoRepository.findWithRolesById(id);

    this.isUserNull(user);

    return user!;
  }
}
