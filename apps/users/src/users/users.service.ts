import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  RegisterRequestDto,
  RegisterResponseDto,
} from '@app/contracts/users/auth/dto';
import { RolesService } from '../roles/roles.service';
import { UserMapper } from './mappers';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private rolesService: RolesService,
  ) {}

  async create(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { email, password } = dto;

    const existedUser = await this.usersRepository.getByEmail(email);
    if (existedUser) {
      throw new RpcException({
        statusCode: 400,
        message: 'User with same email exists',
      });
    }
    const role = await this.rolesService.findByName('Пользователь');

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = UserMapper.toCreateUserType(dto, hashPassword, role.id);
    const createdUser = await this.usersRepository.create(user);

    return {
      id: createdUser.id,
    };
  }
}
