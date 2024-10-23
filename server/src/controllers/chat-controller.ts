import { Request, Response } from "express";
import { interactWithCat } from "./langchain-controller.js";
// import { Cat, User, Interaction } from "../models/index.js";

// Chat interaction endpoint
export const chatWithCat = async (req: Request, res: Response) => {
  const { userId, catId, input } = req.body;

  try {
    const response = await interactWithCat(userId, catId, input);
    res.json(response);
  } catch (error) {
    console.error("Error interacting with cat:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
