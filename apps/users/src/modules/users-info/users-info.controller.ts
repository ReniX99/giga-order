import { Controller } from '@nestjs/common';
import { UsersInfoService } from './users-info.service';

@Controller()
export class UsersInfoController {
  constructor(private readonly usersInfoService: UsersInfoService) {}
}
