import { Controller } from '@nestjs/common';
import { UsersInfoService } from './users-info.service';
import { MessagePattern } from '@nestjs/microservices';
import { USERS_INFO_PATTERNS } from '@app/contracts/users/users-info/users-info-patterns';
import { UserInfoDto } from '@app/contracts/users/users-info/dto';
import { Authentication, User } from '../../common/decorators';

@Controller()
export class UsersInfoController {
  constructor(private readonly usersInfoService: UsersInfoService) {}

  @Authentication()
  @MessagePattern(USERS_INFO_PATTERNS.GET_BY_ID)
  async getById(@User('id') userId: string): Promise<UserInfoDto> {
    return this.usersInfoService.getWithEmailById(userId);
  }
}
