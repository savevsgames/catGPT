import { Cat } from "../models/index.js";
import cats from "../utils/data.js";

export const seedCats = async () => {
  // await Cat.bulkCreate([
  // {
  //   name: "Whiskers",
  //   avatar:
  //     "https://images.creativefabrica.com/products/previews/2024/03/28/Q1VpVAgPU/2eITBiz9oom4NtunOFFEE6lr3I4-mobile.jpg",
  //   skin: "tabby",
  //   personality: "playful",
  //   mood: 7,
  //   deathFlag: 0,
  //   isAlive: true,
  //   userId: 1, // Associate the first user with this cat
  // },
  // {
  //   name: "Mittens",
  //   avatar:
  //     "https://i.pinimg.com/736x/33/70/29/33702949116bc77168dd93bdecc9f955.jpg",
  //   skin: "black",
  //   personality: "lazy",
  //   mood: 4,
  //   deathFlag: 0,
  //   isAlive: true,
  //   userId: 2, // Associate the second user
  // },
  // {
  //   name: "Shadow",
  //   avatar:
  //     "https://images.creativefabrica.com/products/previews/2024/03/06/VoRPI9rBL/2dIQNwSeGhxKq9HyzCXVJLEcSo4-mobile.jpg",
  //   skin: "grey",
  //   personality: "mischievous",
  //   mood: 1,
  //   deathFlag: 0,
  //   isAlive: true,
  //   userId: 3, // Associate the third user
  // },
  // ]);
  await Cat.bulkCreate(cats);
};
