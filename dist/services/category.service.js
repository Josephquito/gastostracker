import prisma from "../lib/prisma.js";
export const createCategory = async (data) => {
    const existing = await prisma.category.findFirst({
        where: { name: data.name, userId: data.userId },
    });
    if (existing)
        throw new Error(`La categoría "${data.name}" ya existe`);
    return await prisma.category.create({ data });
};
export const getCategoriesByUser = async (userId) => {
    return await prisma.category.findMany({
        where: { userId },
        orderBy: { id: "asc" },
    });
};
export const updateCategory = async (id, userId, data) => {
    const category = await prisma.category.findFirst({ where: { id, userId } });
    if (!category)
        throw new Error("Categoría no encontrada");
    return await prisma.category.update({ where: { id }, data });
};
export const deleteCategory = async (id, userId) => {
    const category = await prisma.category.findFirst({ where: { id, userId } });
    if (!category)
        throw new Error("Categoría no encontrada");
    return await prisma.category.delete({ where: { id } });
};
export const getCategoryNamesText = async (userId) => {
    const categories = await prisma.category.findMany({
        where: { userId },
        orderBy: { id: "asc" },
    });
    return categories.map((c) => `${c.emoji} ${c.name}`).join("\n");
};
export const getCategoryByName = async (name, userId) => {
    const cleanName = name.replace(/^\S+\s/, "");
    return await prisma.category.findFirst({
        where: { name: cleanName, userId },
    });
};
