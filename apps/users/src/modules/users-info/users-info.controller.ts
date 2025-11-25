import { Controller } from '@nestjs/common';
import { UsersInfoService } from './users-info.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USERS_INFO_PATTERNS } from '@app/contracts/users/users-info/users-info-patterns';
import {
  FullUserInfoDto,
  ShortUserInfoDto,
  UpdatedUserInfoDto,
  UserInfoDto,
} from '@app/contracts/users/users-info/dto';
import {
  Authentication,
  Authorization,
  Roles,
  User,
} from '../../common/decorators';
import { RoleEnum } from '@app/contracts/shared/enums';
import { UserInfoQuery } from '@app/contracts/users/users-info/query';

@Controller()
export class UsersInfoController {
  constructor(private readonly usersInfoService: UsersInfoService) {}

  @Roles(RoleEnum.ADMIN)
  @Authorization()
  @MessagePattern(USERS_INFO_PATTERNS.GET_ALL)
  async getAll(
    @Payload('data') query: UserInfoQuery,
  ): Promise<FullUserInfoDto[]> {
    return this.usersInfoService.getAll(query);
  }

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
