import { RoleDto } from '@app/contracts/users/roles/dto';
import { Role } from 'apps/users/generated/prisma/client';

export const role: Role = {
  id: 1,
  name: 'Пользователь',
  createdAt: new Date('2025-10-01'),
  updatedAt: new Date('2025-10-02'),
};

export const roles: Role[] = [
  role,
  {
    id: 2,
    name: 'Менеджер',
    createdAt: new Date('2025-10-01'),
    updatedAt: new Date('2025-10-02'),
  },
];

export const rolesDto: RoleDto[] = [
  {
    id: 1,
    name: 'Пользователь',
  },
  {
    id: 2,
    name: 'Менеджер',
  },
];
