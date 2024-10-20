import express from "express";
import {
  getAllInteractions,
  getInteractionById,
  createInteraction,
} from "../../controllers/interaction-controller.js";

const router = express.Router();

// GET/interactions - get all interactions
router.get("/", getAllInteractions);

// GET /interactions/:id
router.get("/:id", getInteractionById);

// POST /interactions
router.post("/", createInteraction);

export { router as interactionRouter };
