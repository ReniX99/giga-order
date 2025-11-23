import { Role, User, UserInfo, UserRole } from '../../prisma/generated/client';

export type UserInfoWithRoles = UserInfo & {
  roles: (UserRole & {
    role: Role;
  })[];
};

export type UserInfoWithEmail = UserInfo & {
  user: User;
};

export type FullUserInfo = UserInfo & {
  user: User;
  roles: (UserRole & {
    role: Role;
  })[];
};
