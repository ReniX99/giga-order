import { User, UserInfo } from '../../prisma/generated/client';

export type UserWithUserInfoModel = User & {
  userInfo: UserInfo;
};
