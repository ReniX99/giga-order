import { UserInfoDto } from '@app/contracts/users/users-info/dto';
import { UserInfoWithEmail } from '../types';

export class UserInfoMapper {
  static toUserInfoDto(userInfoModel: UserInfoWithEmail): UserInfoDto {
    return {
      email: userInfoModel.user.email,
      lastName: userInfoModel.lastName,
      firstName: userInfoModel.firstName,
    };
  }
}
