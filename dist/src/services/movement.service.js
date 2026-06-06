import prisma from "../lib/prisma.js";
export const getMovements = async (userId) => {
    return await prisma.movement.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};
