import { User, UserInfo } from 'apps/users/generated/prisma/client';

export type UserWithUserInfoModel = User & {
  userInfo: UserInfo;
};
