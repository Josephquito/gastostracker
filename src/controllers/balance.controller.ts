import { Request, Response } from "express";
import * as balanceService from "../services/balance.service.js";

export const get = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const balance = await balanceService.getBalance(userId);
    res.json(balance);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const balance = await balanceService.createBalance(
      req.body.userId,
      req.body.amount,
    );
    res.status(201).json(balance);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const adjust = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const balance = await balanceService.adjustBalance(userId, req.body.amount);
    res.json(balance);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const income = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const balance = await balanceService.addIncome(
      userId,
      req.body.amount,
      req.body.description,
    );
    res.json(balance);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
