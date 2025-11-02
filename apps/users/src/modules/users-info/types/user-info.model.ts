import {
  Role,
  User,
  UserInfo,
  UserRole,
} from 'apps/users/generated/prisma/client';

export type UserInfoWithRoles = UserInfo & {
  roles: (UserRole & {
    role: Role;
  })[];
};

export type UserInfoWithEmail = UserInfo & {
  user: User;
};
