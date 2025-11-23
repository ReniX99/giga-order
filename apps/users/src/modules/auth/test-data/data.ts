import {
  LoginMicroserviceResponseDto,
  LoginRequestDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from '@app/contracts/users/auth/dto';
import { User, UserInfo } from '../../prisma/generated/client';
import * as bcrypt from 'bcrypt';
import { UserInfoWithRoles } from '../../users-info/types';
import { TJwtPayload, TJwtResponse } from '../types';

export const createUserDto: RegisterRequestDto = {
  email: 'mock@gmail.com',
  lastName: 'Иванов',
  firstName: 'Иван',
  password: '12345678',
};

export const userId: string = 'e5f8171d-9f1c-4c39-b3ff-46acc17c9da2';
export const userIdDto: RegisterResponseDto = {
  id: userId,
};

export const loginRequestDto: LoginRequestDto = {
  email: 'mock@gmail.com',
  password: '12345678',
};

export const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNWY4MTcxZC05ZjFjLTRjMzktYjNmZi03NmFjYzE3YzlkYTIiLCJpYXQiOjE3NjIxODA1NzgsImV4cCI6MTc2Mjc4NTM3OH0.ThVv0fDPbmPw5mDVzPsJR0Rv9sESxTp0obg_pioEvG0';

export const loginResponseDto: LoginMicroserviceResponseDto = {
  id: userId,
  token: token,
};

const salt = bcrypt.genSaltSync();
export const user: User = {
  id: userId,
  email: 'mock@gmail.com',
  password: bcrypt.hashSync('12345678', salt),
  createdAt: new Date('2025-10-01'),
  updatedAt: new Date('2025-10-02'),
};

export const userInfo: UserInfo = {
  userId,
  lastName: 'Иванов',
  firstName: 'Иван',
  createdAt: new Date('2025-10-01'),
  updatedAt: new Date('2025-10-02'),
};

export const userWithRoles: UserInfoWithRoles = {
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

export const jwtPayload: TJwtPayload = {
  userId,
};

export const jwtResponse: TJwtResponse = {
  id: userId,
  roles: ['Пользователь', 'Админ'],
};
