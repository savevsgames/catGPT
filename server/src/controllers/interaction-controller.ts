import { Request, Response } from "express";
import { Interaction, Cat, User } from "../models/index.js";

// GET /interactions - get all types of interactions, include the cat's name, and the user that made that interaction

export const getAllInteractions = async (_req: Request, res: Response) => {
  try {
    const interactions = await Interaction.findAll({
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["username"],
        },
        {
          model: Cat,
          as: "cat",
          attributes: ["name"],
        },
      ],
      order: ["interactionDate"],
    });
    res.status(200).json(interactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /interactions/:id - get a single interaction by id. not sure if we would use this at any point tbh
export const getInteractionById = async (req: Request, res: Response) => {
  try {
    const interaction = await Interaction.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["username"],
        },
        {
          model: Cat,
          as: "cat",
          attributes: ["name"],
        },
      ],
    });
    if (!interaction) {
      res.status(404).json("Interaction not found");
    } else {
      res.status(200).json(interaction);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /interactions - create/commit an interaction on a cat
// export const createInteraction2 = async (req: Request, res: Response) => {
//   try {
//     const { interactionType, description, userId, catId } = req.body;
//     const interaction = await Interaction.create({
//       interactionType,
//       description,
//       interactionDate: new Date(), // automatically sets the date. no user interaction needed for that
//       userId,
//       catId,
//     });
//     res.status(201).json(interaction);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// GET- cats/:catId/interaction - interaction for a certain cat
export const createInteraction = async (req: Request, res: Response) => {
  console.log("im in");
  const { interactionType } = req.body;
  const catId = Number(req.params.catId); // Convert catId from string to number
  const userId = req.user?.id; // Get userId from the logged-in user (from JWT middleware)

  if (isNaN(catId)) {
    res.status(400).json({ message: "Invalid cat ID" }); // Handle invalid catId
  }

  try {
    const interaction = await Interaction.create({
      interactionType,
      catId, // Log the interaction for this specific cat
      userId, // Log which user is interacting
      interactionDate: new Date(),
    });
    // logic to control the yarn value
    res.status(201).json(interaction); // Respond with the logged interaction
  } catch (error) {
    res.status(500).json({ error: "Failed to log interaction" });
  }
};

// no PUT request needed. I dont think we would be updating an interaction once it's made. at leats it doesnt make sense to me.

// no DELETE request needed, because I dont think it's reasonable to delete an interaction once it's made.
