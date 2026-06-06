import { Router } from "express";
import * as fixedExpenseController from "../controllers/fixedExpense.controller.js";

const router = Router();

router.get("/:userId", fixedExpenseController.getAll);
router.get("/:userId/pending", fixedExpenseController.getPending);
router.post("/", fixedExpenseController.create);
router.put("/:id", fixedExpenseController.update);
router.delete("/:id", fixedExpenseController.remove);
router.post("/pay", fixedExpenseController.pay);

export default router;
