import { Injectable } from '@nestjs/common';
import { UsersInfoRepository } from './users-info.repository';
import { RpcException } from '@nestjs/microservices';
import { UserInfoWithRoles } from './types';
import {
  ShortUserInfoDto,
  UpdatedUserInfoDto,
  UserInfoDto,
} from '@app/contracts/users/users-info/dto';
import { UserInfoMapper } from './mappers/user-info.mapper';

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

  async getWithEmailById(id: string): Promise<UserInfoDto> {
    const user = await this.usersInfoRepository.findWithEmailById(id);

    this.isUserNull(user);

    const dto = UserInfoMapper.toUserInfoDto(user!);
    return dto;
  }

  async updateById(
    id: string,
    requestDto: UpdatedUserInfoDto,
  ): Promise<ShortUserInfoDto> {
    const user = await this.usersInfoRepository.findById(id);

    this.isUserNull(user);

    const updatedUser = await this.usersInfoRepository.updateById(
      user!.userId,
      requestDto,
    );

    const responseDto = UserInfoMapper.toShortUserInfoDto(updatedUser);
    return responseDto;
  }
}
