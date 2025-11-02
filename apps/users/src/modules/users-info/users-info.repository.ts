import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoWithEmail, UserInfoWithRoles } from './types';

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
}
