import cron from 'node-cron';
import {PrismaClient, TypeAction} from '@prisma/client';

const prisma = new PrismaClient();

const  startQueue = async () => {
  const action = await prisma.action.findFirst({
    where: {
      state: 'NON_CONSUMED',
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      typeAction: true,
    },
  });
  if(!action || action.typeAction.currentValue === 0) {
    await initCreditTypeAction();
  }

  let compteur = 0;
  cron.schedule('*/15 * * * * *', async () => {
    console.log('Task executed at', new Date().toISOString());
    try {
      const actionCron = await prisma.action.findFirst({
        where: {
          state: 'NON_CONSUMED',
        },
        include: {
          typeAction: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      if(!actionCron || actionCron.typeAction.currentValue === 0) {
        compteur += 1
        console.log('compteur ', compteur);
        if(compteur === 10) { // ICI mettre 40
          await initCreditTypeAction();
          compteur = 0;
        }
      } else {
        compteur = 0;

        await prisma.action.update({
            where: {id: actionCron.id},
            data: {state: 'CONSUMED'},
          });
        await prisma.typeAction.update({
          where: {id: actionCron.typeAction.id},
          data: { currentValue : actionCron.typeAction.currentValue - 1 }
        })
      }
    } catch (error) {
      console.error('Error executing task:', error);
    }
  });
};

const initCreditTypeAction = async () => {
  const typeActions = await prisma.typeAction.findMany();
  const updatePromises = typeActions.map(async (typeAction: TypeAction) => {

    const randomCredit = Math.floor(typeAction.creditMax * (0.8 + Math.random() * 0.2));
    await prisma.typeAction.update({
      where: { id: typeAction.id },
      data: { currentValue: randomCredit },
    });
  });
  await Promise.all(updatePromises);
  console.log('All typeActions updated');
}
export default startQueue;
