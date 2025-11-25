import {
  FullUserInfoDto,
  ShortUserInfoDto,
  UpdatedUserInfoDto,
  UserInfoDto,
} from '@app/contracts/users/users-info/dto';
import { UserInfoQuery } from '@app/contracts/users/users-info/query';
import { FullUserInfo, UserInfoWithEmail, UserInfoWithRoles } from '../types';
import { UserInfo } from '../../prisma/generated/client';

export const userId: string = 'e5f8171d-9f1c-4c39-b3ff-46acc17c9da2';
export const userInfo: UserInfo = {
  userId,
  lastName: 'Иванов',
  firstName: 'Иван',
  createdAt: new Date('2025-10-01'),
  updatedAt: new Date('2025-10-02'),
};

export const userInfoQuery: UserInfoQuery = {
  firstName: 'Иван',
  page: 1,
  count: 3,
};

export const fullUserInfo: FullUserInfo[] = [
  {
    userId,
    lastName: 'Иванов',
    firstName: 'Иван',
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-02'),
    user: {
      id: userInfo.userId,
      email: 'user1@gmail.com',
      password: '',
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-02'),
    },
    roles: [
      {
        userId,
        roleId: 1,
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-02'),
        role: {
          id: 1,
          name: 'Пользователь',
          createdAt: new Date('2025-10-01'),
          updatedAt: new Date('2025-10-02'),
        },
      },
    ],
  },
  {
    userId,
    lastName: 'Сидоров',
    firstName: 'Иван',
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-02'),
    user: {
      id: userInfo.userId,
      email: 'user2@gmail.com',
      password: '',
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-02'),
    },
    roles: [
      {
        userId,
        roleId: 2,
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-02'),
        role: {
          id: 2,
          name: 'Менеджер',
          createdAt: new Date('2025-10-01'),
          updatedAt: new Date('2025-10-02'),
        },
      },
    ],
  },
  {
    userId,
    lastName: 'Фёдоров',
    firstName: 'Иван',
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-02'),
    user: {
      id: userInfo.userId,
      email: 'user3@gmail.com',
      password: '',
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-02'),
    },
    roles: [
      {
        userId,
        roleId: 3,
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-02'),
        role: {
          id: 3,
          name: 'Админ',
          createdAt: new Date('2025-10-01'),
          updatedAt: new Date('2025-10-02'),
        },
      },
    ],
  },
];

export const fullUsersInfoDto: FullUserInfoDto[] = [
  {
    id: userId,
    email: 'user1@gmail.com',
    lastName: 'Иванов',
    firstName: 'Иван',
    roles: ['Пользователь'],
  },
  {
    id: userId,
    email: 'user2@gmail.com',
    lastName: 'Сидоров',
    firstName: 'Иван',
    roles: ['Менеджер'],
  },
  {
    id: userId,
    email: 'user3@gmail.com',
    lastName: 'Фёдоров',
    firstName: 'Иван',
    roles: ['Админ'],
  },
];

export const userInfoWithRoles: UserInfoWithRoles = {
  ...userInfo,
  roles: [
    {
      userId,
      roleId: 1,
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-02'),
      role: {
        id: 1,
        name: 'Пользователь',
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-02'),
      },
    },
    {
      userId,
      roleId: 2,
      createdAt: new Date('2025-10-01'),
      updatedAt: new Date('2025-10-02'),
      role: {
        id: 2,
        name: 'Админ',
        createdAt: new Date('2025-10-01'),
        updatedAt: new Date('2025-10-02'),
      },
    },
  ],
};

export const userInfoWithEmail: UserInfoWithEmail = {
  ...userInfo,
  user: {
    id: userId,
    email: 'mock@gmail.com',
    password: '',
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-02'),
  },
};

export const userInfoDto: UserInfoDto = {
  email: 'mock@gmail.com',
  lastName: 'Иванов',
  firstName: 'Иван',
};

export const updatedUserInfoDto: UpdatedUserInfoDto = {
  lastName: 'Сидоров',
  firstName: 'Кирилл',
};

export const updatedUserInfo: UserInfo = {
  userId,
  lastName: 'Сидоров',
  firstName: 'Кирилл',
  createdAt: new Date('2025-10-01'),
  updatedAt: new Date('2025-10-02'),
};

export const shortUserInfoDto: ShortUserInfoDto = {
  lastName: 'Сидоров',
  firstName: 'Кирилл',
};
