import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../prisma/generated/client';

@Injectable()
export class RolesRepository {
  constructor(private prismaService: PrismaService) {}

  async findByName(name: string): Promise<Role | null> {
    return await this.prismaService.role.findUnique({
      where: {
        name,
      },
    });
  }

  async getAll(): Promise<Role[]> {
    return await this.prismaService.role.findMany();
  }

  async getById(id: number): Promise<Role | null> {
    return await this.prismaService.role.findUnique({
      where: {
        id,
      },
    });
  }
}
