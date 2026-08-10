// backend/src/handlers/productHandler.ts
import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, image, price, priceDisplay } = req.body;
    const newProduct = await prisma.product.create({
      data: { name, description, image, price, priceDisplay },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Could not create product' });
  }
};
