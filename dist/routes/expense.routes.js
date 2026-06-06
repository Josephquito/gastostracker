import { Router } from "express";
import * as expenseController from "../controllers/expense.controller.js";
const router = Router();
router.post("/", expenseController.create);
router.get("/:userId", expenseController.getAll);
router.delete("/:id", expenseController.remove);
export default router;
