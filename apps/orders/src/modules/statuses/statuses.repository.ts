import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '../prisma/generated/client';

@Injectable()
export class StatusesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getByName(name: string): Promise<Status | null> {
    return await this.prismaService.status.findUnique({
      where: {
        name,
      },
    });
  }

  async getById(id: number): Promise<Status | null> {
    return await this.prismaService.status.findUnique({
      where: {
        id,
      },
    });
  }
}
