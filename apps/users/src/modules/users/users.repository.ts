import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TCreateUser } from './types';
import { User } from '../prisma/generated/client';

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: TCreateUser): Promise<User> {
    const { email, password, roleId } = user;
    const { lastName, firstName } = user.userInfo;

    return await this.prismaService.user.create({
      data: {
        email,
        password,
        userInfo: {
          create: {
            lastName,
            firstName,
            roles: {
              create: {
                roleId,
              },
            },
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
