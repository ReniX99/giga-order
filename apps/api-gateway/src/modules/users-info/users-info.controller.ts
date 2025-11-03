import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersInfoService } from './users-info.service';
import { JwtInCookies } from '../../common/decorators';
import {
  FullUserInfoDto,
  ShortUserInfoDto,
  UpdatedUserInfoDto,
  UserInfoDto,
} from '@app/contracts/users/users-info/dto';
import { Request } from 'express';
import { UserInfoQuery } from '@app/contracts/users/users-info/query';

@Controller('user-info')
export class UsersInfoController {
  constructor(private readonly usersInfoService: UsersInfoService) {}

  @JwtInCookies()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('all')
  async getAll(
    @Req() request: Request,
    @Query() query: UserInfoQuery,
  ): Promise<FullUserInfoDto[]> {
    return this.usersInfoService.getAll(request, query);
  }

  @JwtInCookies()
  @Get()
  async getById(@Req() request: Request): Promise<UserInfoDto> {
    return this.usersInfoService.getById(request);
  }

  @JwtInCookies()
  @Put()
  async update(
    @Req() request: Request,
    @Body() dto: UpdatedUserInfoDto,
  ): Promise<ShortUserInfoDto> {
    return this.usersInfoService.update(request, dto);
  }
}
