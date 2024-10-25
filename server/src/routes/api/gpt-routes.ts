import express, { Request, Response } from "express";
import { chatWithCat } from "../../controllers/chat-controller.js";

const router = express.Router();

// Arrow function to handle the chat interaction with no return value
router.post("/", async (req: Request, res: Response) => chatWithCat(req, res));

export { router as chatRouter };
