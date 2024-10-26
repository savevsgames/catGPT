import { Request, Response } from "express";
// import interactWithCat from "./langchain-controller";
import { interactWithCat } from "./langchain-controller.js";
// import { Cat, User, Interaction } from "../models/index.js";

// Chat interaction endpoint
export const chatWithCat = async (req: Request, res: Response) => {
  // console.log("Chat request received:", req.body); // Log request body

  try {
    const response = await interactWithCat(req, res); // Get the structured response
    // console.log("Final response to be sent:", response); // Log response

    // Send the response to the frontend
    return res.status(200).json(response); // Ensure 200 OK response
  } catch (error) {
    console.error("Error interacting with cat:", error);
    return res.status(500).json({ error: "Something went wrong" }); // Handle errors
  }
};
