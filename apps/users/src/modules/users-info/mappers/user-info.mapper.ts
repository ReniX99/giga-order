import {
  FullUserInfoDto,
  ShortUserInfoDto,
  UserInfoDto,
} from '@app/contracts/users/users-info/dto';
import { FullUserInfo, UserInfoWithEmail } from '../types';
import { UserInfo } from 'apps/users/generated/prisma/client';

export class UserInfoMapper {
  static toUserInfoDto(userInfoModel: UserInfoWithEmail): UserInfoDto {
    return {
      email: userInfoModel.user.email,
      lastName: userInfoModel.lastName,
      firstName: userInfoModel.firstName,
    };
  }

  static toShortUserInfoDto(userInfoModel: UserInfo): ShortUserInfoDto {
    return {
      lastName: userInfoModel.lastName,
      firstName: userInfoModel.firstName,
    };
  }

  static toFullUserInfoDto(userInfoModel: FullUserInfo): FullUserInfoDto {
    return {
      email: userInfoModel.user.email,
      lastName: userInfoModel.lastName,
      firstName: userInfoModel.firstName,
      roles: userInfoModel.roles.map((r) => r.role.name),
    };
  }
}
