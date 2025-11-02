import { Controller, Get, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from '@app/contracts/users/roles/dto';
import { Request } from 'express';
import { JwtInCookies } from '../../common/decorators';

@Controller('roles')
export class RolesController {
  private COOKIE_NAME: string;

  constructor(private readonly rolesService: RolesService) {}

  @JwtInCookies()
  @Get()
  async getAll(@Req() request: Request): Promise<RoleDto[]> {
    return this.rolesService.getAll(request);
  }
}
