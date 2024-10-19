import { User } from "../models/user.js";

export const seedUsers = async () => {
  await User.bulkCreate([
    {
      username: "johndoe",
      password: "password123", // This will be hashed on the db table
      email: "john.doe@example.com",
      userRole: "standard user",
      bio: "Love cats, and aspiring cat whisperer.",
      yarn: 500,
    },
    {
      username: "janedoe",
      password: "password123",
      email: "jane.doe@example.com",
      userRole: "admin",
      bio: "Admin of the CatGPT universe.",
      yarn: 1000,
    },
    {
      username: "catlover99",
      password: "password123",
      email: "cat.lover99@example.com",
      userRole: "standard user",
      bio: "Cant stop adopting cats!",
      yarn: 700,
    },
  ]);
};
