import { Controller, Get, Req } from '@nestjs/common';
import { UsersInfoService } from './users-info.service';
import { JwtInCookies } from '../../common/decorators';
import { UserInfoDto } from '@app/contracts/users/users-info/dto';
import { Request } from 'express';

@Controller('user-info')
export class UsersInfoController {
  constructor(private readonly usersInfoService: UsersInfoService) {}

  @JwtInCookies()
  @Get()
  async getById(@Req() request: Request): Promise<UserInfoDto> {
    return this.usersInfoService.getById(request);
  }
}
