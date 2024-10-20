import { Cat } from "../models/index.js";

export const seedCats = async () => {
  await Cat.bulkCreate([
    {
      name: "Whiskers",
      skin: "tabby",
      personality: "playful",
      mood: 7,
      deathFlag: 0,
      isAlive: true,
      userId: 1, // Associate the first user with this cat
    },
    {
      name: "Mittens",
      skin: "black",
      personality: "lazy",
      mood: 4,
      deathFlag: 0,
      isAlive: true,
      userId: 2, // Associate the second user
    },
    {
      name: "Shadow",
      skin: "grey",
      personality: "mischievous",
      mood: 1,
      deathFlag: 0,
      isAlive: true,
      userId: 3, // Associate the third user
    },
  ]);
};
