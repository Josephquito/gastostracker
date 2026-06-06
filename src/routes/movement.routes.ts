import { Router } from "express";
import * as movementController from "../controllers/movement.controller.js";

const router = Router();

router.get("/:userId", movementController.getAll);

export default router;
