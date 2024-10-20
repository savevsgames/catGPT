import express from "express";
import { chatWithCat } from "../../controllers/gpt-controller.js";

const router = express.Router();

router.post("/", chatWithCat);

export { router as chatRouter };
