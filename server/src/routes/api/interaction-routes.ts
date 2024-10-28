import express from "express";
import {
  getAllInteractions,
  getInteractionById,
  createInteraction,
  getLast5Interactions,
} from "../../controllers/interaction-controller.js";

const router = express.Router();

// GET/interactions - get all interactions
router.get("/", getAllInteractions);

// GET /interactions/:id
router.get("/:id", getInteractionById);

// POST /interactions -post an interaction to a specific cat
router.post("/:catId", createInteraction); // when this route is hit, it means the cat of catId is getting an interaction

// GET /lastfive - to extract the last five interaction were done on a specific cat
router.get("/lastfive/cats", getLast5Interactions);

export { router as interactionRouter };
