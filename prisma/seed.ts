import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.fixedPayment.deleteMany();
  await prisma.fixedExpense.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.movement.deleteMany();
  await prisma.balance.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      name: "Joseph",
      balance: {
        create: { amount: 1000 },
      },
      categories: {
        create: [
          { name: "Comida", emoji: "🍔", budget: 80 },
          { name: "Casa", emoji: "🏠", budget: 50 },
          { name: "Gasolina", emoji: "⛽", budget: 80 },
          { name: "Ropa", emoji: "👕", budget: 30 },
          { name: "Salud", emoji: "💊", budget: 30 },
          { name: "Regalos", emoji: "🎁", budget: 20 },
          { name: "Transporte", emoji: "🚗", budget: 20 },
          { name: "Salidas", emoji: "🎉", budget: 80 },
          { name: "Otros", emoji: "📦", budget: 30 },
        ],
      },
      fixedExpenses: {
        create: [
          { name: "Pensión alimenticia", estimatedAmount: 154 },
          { name: "Instituto", estimatedAmount: 281 },
          { name: "Internet", estimatedAmount: 28 },
          { name: "Plan de datos", estimatedAmount: 15 },
          { name: "Spotify", estimatedAmount: 4 },
          { name: "Claude Pro", estimatedAmount: 21 },
          { name: "iCloud", estimatedAmount: 4 },
          { name: "Gym", estimatedAmount: 30 },
        ],
      },
    },
  });

  console.log("✅ Seed completado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
