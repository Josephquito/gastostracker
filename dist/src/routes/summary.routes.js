import { Router } from "express";
import * as summaryController from "../controllers/summary.controller.js";
const router = Router();
router.get("/:userId", summaryController.get);
router.get("/:userId/text", summaryController.getText);
router.get("/:userId/balance", summaryController.getBalanceText);
export default router;
