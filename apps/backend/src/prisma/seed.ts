import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const typeA = await prisma.typeAction.upsert({
    where: { libelle: 'A' },
    update: {},
    create: {
      libelle: 'A',
      creditMax: 5,
      createdAt: new Date(),
      currentValue: 0,
    },
  });

  const typeB = await prisma.typeAction.upsert({
    where: { libelle: 'B' },
    update: {},
    create: {
      libelle: 'B',
      creditMax: 4,
      createdAt: new Date(),
      currentValue: 0,
    },
  });

  const typeC = await prisma.typeAction.upsert({
    where: { libelle: 'C' },
    update: {},
    create: {
      libelle: 'C',
      creditMax: 8,
      createdAt: new Date(),
      currentValue: 0,
    },
  });

  console.log({ typeA, typeB, typeC });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
