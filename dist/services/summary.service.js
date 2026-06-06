import prisma from "../lib/prisma.js";
export const getSummary = async (userId) => {
    const balance = await prisma.balance.findUnique({ where: { userId } });
    if (!balance)
        throw new Error("Balance no encontrado");
    const categories = await prisma.category.findMany({
        where: { userId },
        orderBy: { id: "asc" },
    });
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const expenses = await prisma.expense.groupBy({
        by: ["categoryId"],
        where: {
            userId,
            createdAt: { gte: start, lte: end },
        },
        _sum: { amount: true },
    });
    const spentMap = new Map(expenses.map((e) => [e.categoryId, e._sum.amount ?? 0]));
    return {
        balance: balance.amount,
        categories: categories.map((c) => ({
            id: c.id,
            name: c.name,
            emoji: c.emoji,
            budget: c.budget,
            spent: spentMap.get(c.id) ?? 0,
            available: c.budget - (spentMap.get(c.id) ?? 0),
        })),
    };
};
export const getSummaryText = async (userId) => {
    const summary = await getSummary(userId);
    const lines = summary.categories.map((c) => `${c.emoji} ${c.name}: $${c.available.toFixed(2)}`);
    return `Saldo disponible: $${summary.balance.toFixed(2)}\n\n${lines.join("\n")}`;
};
