import { RegisterRequestDto } from '@app/contracts/users/auth/dto';
import { TCreateUser } from '../types';

export class UserMapper {
  static toCreateUserType(
    dto: RegisterRequestDto,
    hashPassword: string,
    roleId: number,
  ): TCreateUser {
    const { email, lastName, firstName } = dto;
    return {
      email,
      password: hashPassword,
      userInfo: {
        lastName,
        firstName,
      },
      roleId: roleId,
    };
  }
}
