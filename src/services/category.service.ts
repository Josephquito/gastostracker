import prisma from "../lib/prisma.js";

export const createCategory = async (data: {
  name: string;
  emoji: string;
  budget: number;
  userId: number;
}) => {
  const existing = await prisma.category.findFirst({
    where: { name: data.name, userId: data.userId },
  });
  if (existing) throw new Error(`La categoría "${data.name}" ya existe`);

  return await prisma.category.create({ data });
};

export const getCategoriesByUser = async (userId: number) => {
  return await prisma.category.findMany({
    where: { userId },
    orderBy: { id: "asc" },
  });
};

export const updateCategory = async (
  id: number,
  userId: number,
  data: Partial<{ name: string; emoji: string; budget: number }>,
) => {
  const category = await prisma.category.findFirst({ where: { id, userId } });
  if (!category) throw new Error("Categoría no encontrada");
  return await prisma.category.update({ where: { id }, data });
};

export const deleteCategory = async (id: number, userId: number) => {
  const category = await prisma.category.findFirst({ where: { id, userId } });
  if (!category) throw new Error("Categoría no encontrada");
  return await prisma.category.delete({ where: { id } });
};

export const getCategoryNamesText = async (userId: number) => {
  const categories = await prisma.category.findMany({
    where: { userId },
    orderBy: { id: "asc" },
  });
  return categories.map((c) => `${c.emoji} ${c.name}`).join("\n");
};

export const getCategoryByName = async (name: string, userId: number) => {
  const cleanName = name.replace(/^\S+\s/, "");
  return await prisma.category.findFirst({
    where: { name: cleanName, userId },
  });
};
