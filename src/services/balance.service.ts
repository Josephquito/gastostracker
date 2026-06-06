import prisma from "../lib/prisma.js";

export const getBalance = async (userId: number) => {
  return await prisma.balance.findUnique({ where: { userId } });
};

export const createBalance = async (userId: number, amount: number) => {
  return await prisma.balance.create({ data: { userId, amount } });
};

export const adjustBalance = async (userId: number, amount: number) => {
  return await prisma.$transaction(async (tx) => {
    const current = await tx.balance.findUnique({ where: { userId } });
    if (!current) throw new Error("Balance no encontrado");

    await tx.movement.create({
      data: { type: "ajuste", amount, userId, description: "Ajuste manual" },
    });

    return await tx.balance.update({
      where: { userId },
      data: { amount },
    });
  });
};

export const addIncome = async (
  userId: number,
  amount: number,
  description?: string,
) => {
  return await prisma.$transaction(async (tx) => {
    await tx.movement.create({
      data: { type: "cobro", amount, userId, description },
    });

    return await tx.balance.update({
      where: { userId },
      data: { amount: { increment: amount } },
    });
  });
};
