import { Request, Response } from "express";
import * as categoryService from "../services/category.service.js";

export const create = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const categories = await categoryService.getCategoriesByUser(userId);
    res.json(categories);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.body.userId);
    const category = await categoryService.updateCategory(id, userId, {
      ...req.body,
      budget: req.body.budget ? Number(req.body.budget) : undefined,
    });
    res.json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.body.userId);
    await categoryService.deleteCategory(id, userId);
    res.json({ message: "Categoría eliminada" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getNames = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const text = await categoryService.getCategoryNamesText(userId);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(text);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getByName = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const name = req.query.name as string;
    const category = await categoryService.getCategoryByName(name, userId);
    if (!category) throw new Error("Categoría no encontrada");
    res.json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
