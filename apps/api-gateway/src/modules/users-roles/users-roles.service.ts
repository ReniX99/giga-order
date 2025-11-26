import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from '../../constants';
import { ClientProxy } from '@nestjs/microservices';
import { CookiesService } from '../cookies/cookies.service';
import { UserRoleDto } from '@app/contracts/users/users-roles/dto';
import { Request } from 'express';
import { RequestMessageDto } from '@app/contracts/shared/dto';
import { USERS_ROLES_PATTERNS } from '@app/contracts/users/users-roles/users-roles-patterns';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersRolesService {
  private COOKIE_NAME = 'COOKIE_NAME';

  constructor(
    @Inject(USERS_CLIENT) private readonly usersClient: ClientProxy,
    private readonly cookiesService: CookiesService,
  ) {}

  async create(request: Request, dto: UserRoleDto): Promise<void> {
    const token = this.cookiesService.getCookie(request, this.COOKIE_NAME);

    const requestMessage: RequestMessageDto<UserRoleDto> = {
      data: dto,
      metadata: {
        token,
      },
    };

    const obsResponse = this.usersClient.send(
      USERS_ROLES_PATTERNS.CREATE,
      requestMessage,
    );

    await firstValueFrom(obsResponse);
  }

  async delete(request: Request, dto: UserRoleDto): Promise<void> {
    const token = this.cookiesService.getCookie(request, this.COOKIE_NAME);

    const requestMessage: RequestMessageDto<UserRoleDto> = {
      data: dto,
      metadata: {
        token,
      },
    };

    const obsResponse = this.usersClient.send(
      USERS_ROLES_PATTERNS.DELETE,
      requestMessage,
    );

    await firstValueFrom(obsResponse);
  }
}
