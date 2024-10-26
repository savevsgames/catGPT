import { Interaction } from "../models/index.js";

// still might need to readjust the cat id's,I put random ones in there for now. might not give anything

export const seedInteractions = async () => {
  await Interaction.bulkCreate([
    {
      interactionType: "play",
      interactionDate: "2024-10-19T10:30:00",
      description: "Played with a toy mouse.",
      userId: 1,
      catId: 1, 
    },
    {
      interactionType: "feed",
      interactionDate: "2024-10-19T12:15:00",
      description: "Fed my kitty some fish.",
      userId: 1,
      catId: 2, 
    },
    {
      interactionType: "gift",
      interactionDate: "2024-10-19T12:30:00",
      description: "Gifted my cat a tower.",
      userId: 2,
      catId: 1, 
    },
    {
      interactionType: "play",
      interactionDate: "2024-10-19T11:30:00",
      description: "Played with a laser pointer.",
      userId: 3,
      catId: 3, 
    },
  ]);
};
