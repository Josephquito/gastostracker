import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
async function main() {
    // Limpiar todo
    await prisma.expense.deleteMany();
    await prisma.movement.deleteMany();
    await prisma.balance.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    // Crear usuario con balance y categorías
    await prisma.user.create({
        data: {
            name: "Joseph",
            balance: {
                create: { amount: 333.43 },
            },
            categories: {
                create: [
                    { name: "Comida", emoji: "🍔", budget: 100 },
                    { name: "Gasolina", emoji: "⛽", budget: 100 },
                    { name: "Ropa", emoji: "👕", budget: 50 },
                    { name: "Salud", emoji: "💊", budget: 40 },
                    { name: "Regalos", emoji: "🎁", budget: 30 },
                    { name: "Transporte", emoji: "🚗", budget: 30 },
                    { name: "Salidas", emoji: "🎉", budget: 80 },
                    { name: "Otros", emoji: "📦", budget: 50 },
                ],
            },
        },
    });
    console.log("✅ Seed completado");
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
