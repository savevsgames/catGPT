import { Request, Response } from "express";
// import interactWithCat from "./langchain-controller";
import { interactWithCat } from "./langchain-controller.js";
// import { Cat, User, Interaction } from "../models/index.js";

// Chat interaction endpoint
export const chatWithCat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // No need to send a res back, or return to the client because this is "typescript custom middleware" and the end function does that
    await interactWithCat(req, res);
  } catch (error) {
    console.error("Error interacting with cat:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
