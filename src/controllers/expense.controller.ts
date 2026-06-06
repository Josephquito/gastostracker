import { Request, Response } from "express";
import * as expenseService from "../services/expense.service.js";

export const create = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.createExpense({
      ...req.body,
      amount: Number(req.body.amount),
      userId: Number(req.body.userId),
    });
    res.status(201).json(expense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const month = req.query.month as string | undefined;
    const expenses = await expenseService.getExpensesByUser(userId, month);
    res.json(expenses);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.body.userId);
    await expenseService.deleteExpense(id, userId);
    res.json({ message: "Gasto eliminado" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
