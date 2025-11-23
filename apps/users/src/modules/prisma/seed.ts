import { PrismaClient } from './generated/client';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config({ path: '../.env' });

const prisma = new PrismaClient();
async function main() {
  const roles = [
    { name: 'Админ' },
    { name: 'Пользователь' },
    { name: 'Менеджер' },
  ];

  const admin = {
    email: process.env.ADMIN_EMAIL as string,
    password: process.env.ADMIN_PASSWORD as string,
    userInfo: {
      lastName: 'Главный',
      firstName: 'Админ',
    },
  };

  await prisma.role.createMany({
    data: roles,
  });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(admin.password, salt);

  await prisma.user.create({
    data: {
      email: admin.email,
      password: hashPassword,
      userInfo: {
        create: {
          lastName: admin.userInfo.lastName,
          firstName: admin.userInfo.firstName,
          roles: {
            create: {
              roleId: 1,
            },
          },
        },
      },
    },
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async () => await prisma.$disconnect());
