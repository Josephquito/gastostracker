import prisma from "../lib/prisma.js";

export const createExpense = async (data: {
  amount: number;
  description?: string;
  categoryName: string;
  userId: number;
}) => {
  if (isNaN(data.amount)) throw new Error("El monto es inválido");

  return await prisma.$transaction(async (tx) => {
    const category = await tx.category.findFirst({
      where: {
        name: data.categoryName.replace(/^\S+\s/, ""),
        userId: data.userId,
      },
    });
    if (!category) throw new Error("Categoría no encontrada");

    const balance = await tx.balance.findUnique({
      where: { userId: data.userId },
    });
    if (!balance) throw new Error("Balance no encontrado");
    if (balance.amount < data.amount) {
      throw new Error(
        `Saldo insuficiente. Disponible: $${balance.amount.toFixed(2)}`,
      );
    }

    const expense = await tx.expense.create({
      data: {
        amount: data.amount,
        description: data.description,
        categoryId: category.id,
        userId: data.userId,
      },
    });

    await tx.balance.update({
      where: { userId: data.userId },
      data: { amount: { decrement: data.amount } },
    });

    return expense;
  });
};

export const getExpensesByUser = async (userId: number, month?: string) => {
  const now = month ? new Date(month) : new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return await prisma.expense.findMany({
    where: {
      userId,
      createdAt: { gte: start, lte: end },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteExpense = async (id: number, userId: number) => {
  const expense = await prisma.expense.findFirst({ where: { id, userId } });
  if (!expense) throw new Error("Gasto no encontrado");

  return await prisma.$transaction(async (tx) => {
    await tx.balance.update({
      where: { userId },
      data: { amount: { increment: expense.amount } },
    });
    return await tx.expense.delete({ where: { id } });
  });
};
