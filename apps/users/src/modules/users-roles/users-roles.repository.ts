import { Injectable } from '@nestjs/common';
import { UserRole } from '../prisma/generated/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRolesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, roleId: number): Promise<UserRole> {
    return await this.prismaService.userRole.create({
      data: {
        userId,
        roleId,
      },
    });
  }

  async getByIds(userId: string, roleId: number): Promise<UserRole | null> {
    return await this.prismaService.userRole.findFirst({
      where: {
        userId,
        roleId,
      },
    });
  }

  async delete(userId: string, roleId: number): Promise<UserRole> {
    return await this.prismaService.userRole.delete({
      where: {
        userId_roleId: {
          userId,
          roleId,
        },
      },
    });
  }
}
