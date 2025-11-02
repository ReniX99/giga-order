import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoWithEmail, UserInfoWithRoles } from './types';
import { TUpdatedUserInfo } from './types/user-info.type';
import { UserInfo } from 'apps/users/generated/prisma/client';

@Injectable()
export class UsersInfoRepository {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async findWithRolesById(id: string): Promise<UserInfoWithRoles | null> {
    return await this.prismaSerivce.userInfo.findUnique({
      where: {
        userId: id,
      },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findWithEmailById(id: string): Promise<UserInfoWithEmail | null> {
    return await this.prismaSerivce.userInfo.findUnique({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });
  }

  async findById(id: string): Promise<UserInfo | null> {
    return await this.prismaSerivce.userInfo.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async updateById(
    id: string,
    updatedUserInfo: TUpdatedUserInfo,
  ): Promise<UserInfo> {
    const { lastName, firstName } = updatedUserInfo;

    return this.prismaSerivce.userInfo.update({
      where: {
        userId: id,
      },
      data: {
        lastName,
        firstName,
      },
    });
  }
}
