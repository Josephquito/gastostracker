import express from "express";
import dotenv from "dotenv";
import expensesRoutes from "./routes/expense.routes";
import categoryRoutes from "./routes/category.routes.js";
import balanceRoutes from "./routes/balance.routes.js";
import movementRoutes from "./routes/movement.routes.js";
import summaryRoutes from "./routes/summary.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/expenses", expensesRoutes);
app.use("/categories", categoryRoutes);
app.use("/balance", balanceRoutes);
app.use("/movements", movementRoutes);
app.use("/summary", summaryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
