import prisma from "../lib/prisma.js";

export const getMovements = async (userId: number) => {
  return await prisma.movement.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
