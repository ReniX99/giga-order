export type TCreateUser = {
  email: string;

  password: string;

  userInfo: TCreateUserInfo;

  roleId: number;
};

export type TCreateUserInfo = {
  lastName: string;

  firstName: string;
};
