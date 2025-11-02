import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserInfoWithRoles } from './types';

@Injectable()
export class UsersInfoRepository {
  constructor(private readonly prismaSerivce: PrismaService) {}

  async findById(id: string): Promise<UserInfoWithRoles | null> {
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
}
