import { Request, Response } from "express";
import * as fixedExpenseService from "../services/fixedExpense.service.js";

export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const expenses = await fixedExpenseService.getFixedExpenses(userId);
    res.json(expenses);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPending = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const pending = await fixedExpenseService.getPendingFixedExpenses(userId);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    if (pending.length === 0) {
      res.send("✅ Todos los gastos fijos pagados");
      return;
    }
    res.send(
      pending.map((p) => `${p.name} (~$${p.estimatedAmount})`).join("\n"),
    );
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const expense = await fixedExpenseService.createFixedExpense({
      ...req.body,
      estimatedAmount: Number(req.body.estimatedAmount),
      userId: Number(req.body.userId),
    });
    res.status(201).json(expense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.body.userId);
    const expense = await fixedExpenseService.updateFixedExpense(id, userId, {
      ...req.body,
      estimatedAmount: req.body.estimatedAmount
        ? Number(req.body.estimatedAmount)
        : undefined,
    });
    res.json(expense);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.body.userId);
    await fixedExpenseService.deleteFixedExpense(id, userId);
    res.json({ message: "Gasto fijo eliminado" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const pay = async (req: Request, res: Response) => {
  try {
    const payment = await fixedExpenseService.payFixedExpense({
      fixedExpenseName: req.body.fixedExpenseName,
      amount: Number(req.body.amount),
      userId: Number(req.body.userId),
    });
    res.status(201).json(payment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
