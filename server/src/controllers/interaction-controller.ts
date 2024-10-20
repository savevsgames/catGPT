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

// GET /interactions/:id - get a single interaction by id
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
export const createInteraction = async (req: Request, res: Response) => {
  try {
    const { interactionType, description, userId, catId } = req.body;
    const interaction = await Interaction.create({
      interactionType,
      description,
      interactionDate: new Date(), // automatically sets the date. no user interaction needed for that
      userId,
      catId,
    });
    res.status(201).json(interaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// no PUT request needed. I dont think we would be updating an interaction once it's made. at leats it doesnt make sense to me.

// no DELETE request needed, because I dont think it's reasonable to delete an interaction once it's made.
