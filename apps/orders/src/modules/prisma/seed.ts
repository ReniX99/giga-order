import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import { PrismaClient } from './generated/client';

dotenv.config({ path: '../.env' });

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });
async function main() {
  const statuses = [
    { name: 'Новая' },
    { name: 'В работе' },
    { name: 'Выполнен' },
    { name: 'Отменён' },
  ];

  await prisma.status.createMany({
    data: statuses,
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async () => await prisma.$disconnect());
