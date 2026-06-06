import { Request, Response } from "express";
import * as summaryService from "../services/summary.service.js";
import prisma from "../lib/prisma.js";

export const get = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const summary = await summaryService.getSummary(userId);
    res.json(summary);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getText = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const text = await summaryService.getSummaryText(userId);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(text);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getBalanceText = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const balance = await prisma.balance.findUnique({ where: { userId } });
    if (!balance) throw new Error("Balance no encontrado");
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(`Saldo disponible: $${balance.amount.toFixed(2)}`);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
