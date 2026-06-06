import prisma from "../lib/prisma.js";

export const getFixedExpenses = async (userId: number) => {
  return await prisma.fixedExpense.findMany({
    where: { userId },
    orderBy: { id: "asc" },
  });
};

export const createFixedExpense = async (data: {
  name: string;
  estimatedAmount: number;
  userId: number;
}) => {
  const existing = await prisma.fixedExpense.findFirst({
    where: { name: data.name, userId: data.userId },
  });
  if (existing) throw new Error(`El gasto fijo "${data.name}" ya existe`);
  return await prisma.fixedExpense.create({ data });
};

export const updateFixedExpense = async (
  id: number,
  userId: number,
  data: Partial<{ name: string; estimatedAmount: number }>,
) => {
  const expense = await prisma.fixedExpense.findFirst({
    where: { id, userId },
  });
  if (!expense) throw new Error("Gasto fijo no encontrado");
  return await prisma.fixedExpense.update({ where: { id }, data });
};

export const deleteFixedExpense = async (id: number, userId: number) => {
  const expense = await prisma.fixedExpense.findFirst({
    where: { id, userId },
  });
  if (!expense) throw new Error("Gasto fijo no encontrado");
  return await prisma.fixedExpense.delete({ where: { id } });
};

export const getPendingFixedExpenses = async (userId: number) => {
  const now = new Date();
  const month = new Date(now.getFullYear(), now.getMonth(), 1);

  const allFixed = await prisma.fixedExpense.findMany({ where: { userId } });
  const paid = await prisma.fixedPayment.findMany({
    where: { userId, month },
  });

  const paidIds = new Set(paid.map((p) => p.fixedExpenseId));

  return allFixed.filter((f) => !paidIds.has(f.id));
};

export const payFixedExpense = async (data: {
  fixedExpenseName: string;
  amount: number;
  userId: number;
}) => {
  const now = new Date();
  const month = new Date(now.getFullYear(), now.getMonth(), 1);

  const cleanName = data.fixedExpenseName
    .replace(/\s*\(~\$[\d.]+\)$/, "")
    .trim();

  const fixedExpense = await prisma.fixedExpense.findFirst({
    where: { name: cleanName, userId: data.userId },
  });
  if (!fixedExpense) throw new Error("Gasto fijo no encontrado");

  return await prisma.$transaction(async (tx) => {
    const balance = await tx.balance.findUnique({
      where: { userId: data.userId },
    });
    if (!balance) throw new Error("Balance no encontrado");
    if (balance.amount < data.amount) {
      throw new Error(
        `Saldo insuficiente. Disponible: $${balance.amount.toFixed(2)}`,
      );
    }

    const payment = await tx.fixedPayment.create({
      data: {
        fixedExpenseId: fixedExpense.id,
        amount: data.amount,
        month,
        userId: data.userId,
      },
    });

    await tx.balance.update({
      where: { userId: data.userId },
      data: { amount: { decrement: data.amount } },
    });

    return payment;
  });
};
