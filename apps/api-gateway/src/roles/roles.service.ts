import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { RoleDto } from '@app/contracts/users/roles/dto';
import { ROLES_PATTERNS } from '@app/contracts/users/roles/roles-patterns';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { RequestMessageDto } from '@app/contracts/shared/dto';
import { CookiesService } from '../cookies/cookies.service';

@Injectable()
export class RolesService {
  private COOKIE_NAME = 'COOKIE_NAME';

  constructor(
    @Inject(USERS_CLIENT) private usersClient: ClientProxy,
    private configSerivice: ConfigService,
    private readonly cookiesService: CookiesService,
  ) {}

  async getAll(request: Request): Promise<RoleDto[]> {
    const token: string = this.cookiesService.getCookie(
      request,
      this.COOKIE_NAME,
    );

    const requestMessage: RequestMessageDto<null> = {
      metadata: {
        token,
      },
    };
    const objResponse = this.usersClient.send<RoleDto[]>(
      ROLES_PATTERNS.GET_ALL,
      requestMessage,
    );

    const response = await firstValueFrom(objResponse);
    return response;
  }
}
