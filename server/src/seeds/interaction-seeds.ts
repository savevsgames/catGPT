import { Interaction } from "../models/interaction.js";

// still might need to readjust the cat id's,I put random ones in there for now. might not give anything

export const seedInteractions = async () => {
  await Interaction.bulkCreate([
    {
      interactionType: "play",
      interactionDate: new Date("2024-10-19T10:30:00"),
      description: "Played with a toy mouse.",
      userId: 1,
      catId: "550e8400-e29b-41d4-a716-446655440000", // Assuming a cat with this UUID exists,can be changed later
    },
    {
      interactionType: "feed",
      interactionDate: new Date("2024-10-19T12:15:00"),
      description: "Fed my kitty some fish.",
      userId: 1,
      catId: "550e8400-e29b-41d4-a716-446655440001", // Another cat with a different UUID
    },
    {
      interactionType: "gift",
      interactionDate: new Date("2024-10-19T12:30:00"),
      description: "Gifted my cat a tower.",
      userId: 2,
      catId: "550e8400-e29b-41d4-a716-446655440000", // Reusing the first cat
    },
    {
      interactionType: "play",
      interactionDate: new Date("2024-10-19T11:30:00"),
      description: "Played with a laser pointer.",
      userId: 3,
      catId: "550e8400-e29b-41d4-a716-446655440001", // Same cat as earlier
    },
  ]);
};
