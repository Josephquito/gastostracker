import { Request, Response } from "express";
import * as movementService from "../services/movement.service.js";

export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const movements = await movementService.getMovements(userId);
    res.json(movements);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
