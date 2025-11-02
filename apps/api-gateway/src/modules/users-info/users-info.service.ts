import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import { UserInfoDto } from '@app/contracts/users/users-info/dto';
import { USERS_INFO_PATTERNS } from '@app/contracts/users/users-info/users-info-patterns';
import { firstValueFrom } from 'rxjs';
import { CookiesService } from '../cookies/cookies.service';
import { Request } from 'express';
import { RequestMessageDto } from '@app/contracts/shared/dto';

@Injectable()
export class UsersInfoService {
  private COOKIE_NAME = 'COOKIE_NAME';

  constructor(
    @Inject(USERS_CLIENT) private readonly usersClient: ClientProxy,
    private readonly cookiesService: CookiesService,
  ) {}

  async getById(request: Request): Promise<UserInfoDto> {
    const token = this.cookiesService.getCookie(request, this.COOKIE_NAME);

    const requestMessage: RequestMessageDto<null> = {
      metadata: {
        token,
      },
    };
    const objResponse = this.usersClient.send<UserInfoDto>(
      USERS_INFO_PATTERNS.GET_BY_ID,
      requestMessage,
    );

    const response = await firstValueFrom(objResponse);
    return response;
  }
}
