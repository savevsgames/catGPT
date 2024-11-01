import { Interaction } from "../models/index.js";

// still might need to readjust the cat id's,I put random ones in there for now. might not give anything

export const seedInteractions = async () => {
  await Interaction.bulkCreate([
    {
      interactionType: "play",
      interactionDate: "2024-10-19T10:30:00",
      description: "Played with a toy mouse.",
      userId: 2,
      catId: 2,
    },
    {
      interactionType: "feed",
      interactionDate: "2024-10-19T12:15:00",
      description: "Fed my kitty some fish.",
      userId: 2,
      catId: 2,
    },
    {
      interactionType: "gift",
      interactionDate: "2024-10-19T12:30:00",
      description: "Gifted my cat a tower.",
      userId: 2,
      catId: 2,
    },
    {
      interactionType: "play",
      interactionDate: "2024-10-19T11:30:00",
      description: "Played with a laser pointer.",
      userId: 2,
      catId: 2,
    },
    {
      interactionType: "play",
      interactionDate: "2024-10-20T10:30:00",
      description: "Played with a feather wand.",
      userId: 2,
      catId: 2,
    },
    {
      interactionType: "feed",
      interactionDate: "2024-10-20T12:15:00",
      description: "Fed my kitty some chicken.",
      userId: 2,
      catId: 2,
    },
    {
      interactionType: "gift",
      interactionDate: "2024-10-20T12:30:00",
      description: "Gifted my cat a scratching post.",
      userId: 2,
      catId: 2,
    },
    {
      interactionType: "play",
      interactionDate: "2024-10-20T11:30:00",
      description: "Played with a ball of yarn.",
      userId: 2,
      catId: 2,
    },
  ]);
};
