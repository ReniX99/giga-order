import {
  RegisterRequestDto,
  RegisterResponseDto,
} from '@app/contracts/users/auth/dto';
import { Role, User } from 'apps/users/generated/prisma/client';
import * as bcrypt from 'bcrypt';

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

const salt = bcrypt.genSaltSync();
export const user: User = {
  id: userId,
  email: 'mock@gmail.com',
  password: bcrypt.hashSync('12345678', salt),
  createdAt: new Date('2025-10-01'),
  updatedAt: new Date('2025-10-02'),
};

export const role: Role = {
  id: 1,
  name: 'Пользователь',
  createdAt: new Date('2025-10-01'),
  updatedAt: new Date('2025-10-02'),
};

export const email: string = createUserDto.email;
