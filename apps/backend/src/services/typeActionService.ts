import prisma from "../prisma/client";

export const getAllTypeActions = async () => {
  return prisma.typeAction.findMany({
    orderBy: {libelle: 'asc'}
  });
};
