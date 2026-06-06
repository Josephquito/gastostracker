import { Router } from "express";
import * as balanceController from "../controllers/balance.controller.js";
const router = Router();
router.post("/", balanceController.create);
router.get("/:userId", balanceController.get);
router.patch("/:userId/adjust", balanceController.adjust);
router.patch("/:userId/income", balanceController.income);
export default router;
