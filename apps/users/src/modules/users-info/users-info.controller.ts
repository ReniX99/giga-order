import { Controller } from '@nestjs/common';
import { UsersInfoService } from './users-info.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USERS_INFO_PATTERNS } from '@app/contracts/users/users-info/users-info-patterns';
import {
  ShortUserInfoDto,
  UpdatedUserInfoDto,
  UserInfoDto,
} from '@app/contracts/users/users-info/dto';
import { Authentication, User } from '../../common/decorators';

@Controller()
export class UsersInfoController {
  constructor(private readonly usersInfoService: UsersInfoService) {}

  @Authentication()
  @MessagePattern(USERS_INFO_PATTERNS.GET_BY_ID)
  async getById(@User('id') userId: string): Promise<UserInfoDto> {
    return this.usersInfoService.getWithEmailById(userId);
  }

  @Authentication()
  @MessagePattern(USERS_INFO_PATTERNS.UPDATE)
  async updateById(
    @User('id') userId: string,
    @Payload('data') dto: UpdatedUserInfoDto,
  ): Promise<ShortUserInfoDto> {
    return this.usersInfoService.updateById(userId, dto);
  }
}
