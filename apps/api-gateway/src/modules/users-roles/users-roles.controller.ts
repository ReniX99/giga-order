import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersRolesService } from './users-roles.service';
import { JwtInCookies } from '../../common/decorators';
import { Request } from 'express';
import { UserRoleDto } from '@app/contracts/users/users-roles/dto';

@Controller('users-roles')
export class UsersRolesController {
  constructor(private readonly usersRolesService: UsersRolesService) {}

  @JwtInCookies()
  @Post()
  async create(
    @Req() request: Request,
    @Body() dto: UserRoleDto,
  ): Promise<void> {
    return this.usersRolesService.create(request, dto);
  }
}
