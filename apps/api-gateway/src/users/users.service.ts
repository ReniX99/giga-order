import { Inject, Injectable } from '@nestjs/common';
import { USERS_CLIENT } from './constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_CLIENT) private usersClient: ClientProxy) {}
}
