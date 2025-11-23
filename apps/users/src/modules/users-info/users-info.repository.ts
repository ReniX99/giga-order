import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FullUserInfo, UserInfoWithEmail, UserInfoWithRoles } from './types';
import { TUpdatedUserInfo, TUserIntoFilter } from './types/user-info.type';
import { UserInfo } from '../prisma/generated/client';

@Injectable()
export class UsersInfoRepository {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async getAll(userInfoFilter: TUserIntoFilter): Promise<FullUserInfo[]> {
    const { email, lastName, firstName, page, count } = userInfoFilter;

    let skip: number = 0;
    if (page && count) {
      skip = (page - 1) * count;
    }

    return await this.prismaSerivce.userInfo.findMany({
      where: {
        lastName: {
          contains: lastName,
          mode: 'insensitive',
        },
        firstName: {
          contains: firstName,
          mode: 'insensitive',
        },
        user: {
          email: {
            contains: email,
            mode: 'insensitive',
          },
        },
      },
      orderBy: [
        {
          lastName: 'asc',
        },
        {
          firstName: 'asc',
        },
      ],
      include: {
        user: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
      skip,
      take: count,
    });
  }

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
