import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  FullUserInfoDto,
  ShortUserInfoDto,
  UpdatedUserInfoDto,
  UserInfoDto,
} from '@app/contracts/users/users-info/dto';
import { USERS_INFO_PATTERNS } from '@app/contracts/users/users-info/users-info-patterns';
import { firstValueFrom } from 'rxjs';
import { CookiesService } from '../cookies/cookies.service';
import { Request } from 'express';
import { RequestMessageDto } from '@app/contracts/shared/dto';
import { UserInfoQuery } from '@app/contracts/users/users-info/query';

@Injectable()
export class UsersInfoService {
  private COOKIE_NAME = 'COOKIE_NAME';

  constructor(
    @Inject(USERS_CLIENT) private readonly usersClient: ClientProxy,
    private readonly cookiesService: CookiesService,
  ) {}

  async getAll(
    request: Request,
    query: UserInfoQuery,
  ): Promise<FullUserInfoDto[]> {
    const token = this.cookiesService.getCookie(request, this.COOKIE_NAME);

    const requestMessage: RequestMessageDto<UserInfoQuery> = {
      data: query,
      metadata: {
        token,
      },
    };

    const obsResponse = this.usersClient.send<FullUserInfoDto[]>(
      USERS_INFO_PATTERNS.GET_ALL,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }

  async getById(request: Request): Promise<UserInfoDto> {
    const token = this.cookiesService.getCookie(request, this.COOKIE_NAME);

    const requestMessage: RequestMessageDto<null> = {
      metadata: {
        token,
      },
    };
    const obsResponse = this.usersClient.send<UserInfoDto>(
      USERS_INFO_PATTERNS.GET_BY_ID,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }

  async update(
    request: Request,
    dto: UpdatedUserInfoDto,
  ): Promise<ShortUserInfoDto> {
    const token = this.cookiesService.getCookie(request, this.COOKIE_NAME);

    const requestMessage: RequestMessageDto<UpdatedUserInfoDto> = {
      data: dto,
      metadata: {
        token,
      },
    };
    const obsResponse = this.usersClient.send<ShortUserInfoDto>(
      USERS_INFO_PATTERNS.UPDATE,
      requestMessage,
    );

    const response = await firstValueFrom(obsResponse);
    return response;
  }
}
