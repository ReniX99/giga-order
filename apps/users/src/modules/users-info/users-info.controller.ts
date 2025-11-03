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
import { Authentication, User } from '../../common/decorators';
import { RoleEnum } from '../roles/enums';
import { Authorization } from '../../common/decorators/authorization.decorator';
import { UserInfoQuery } from '@app/contracts/users/users-info/query';
import { Roles } from '../../common/decorators/roles.decorator';

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
