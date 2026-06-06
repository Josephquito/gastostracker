import prisma from "../lib/prisma.js";
export const getBalance = async (userId) => {
    return await prisma.balance.findUnique({ where: { userId } });
};
export const createBalance = async (userId, amount) => {
    return await prisma.balance.create({ data: { userId, amount } });
};
export const adjustBalance = async (userId, amount) => {
    return await prisma.$transaction(async (tx) => {
        const current = await tx.balance.findUnique({ where: { userId } });
        if (!current)
            throw new Error("Balance no encontrado");
        await tx.movement.create({
            data: { type: "ajuste", amount, userId, description: "Ajuste manual" },
        });
        return await tx.balance.update({
            where: { userId },
            data: { amount },
        });
    });
};
export const addIncome = async (userId, amount, description) => {
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
