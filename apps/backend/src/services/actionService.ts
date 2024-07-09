import prisma from "../prisma/client";

export const getAllActions = async (page: number, pageSize: number) => {
  const actions = await prisma.action.findMany({
    where: {
      state: 'NON_CONSUMED',
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      typeAction: true,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const totalActions = await prisma.action.count({
    where: {
      state: 'NON_CONSUMED',
    },
  });

  const totalPages = Math.ceil(totalActions / pageSize);

  return {
    actions,
    pagination: {
      total: totalActions,
      page,
      pageSize,
      isFirstPage: page === 1,
      isLastPage: page === totalPages,
    },
  };
};

export const addAction = async (typeActionId: number) => {

  return prisma.action.create({
    data: {
      libelle: '',
      typeActionId: typeActionId,
      state: 'NON_CONSUMED',
      createdAt: new Date(),
    }
  });


};
