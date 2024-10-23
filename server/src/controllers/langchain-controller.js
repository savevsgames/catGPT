import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";

// SQL Data Retrieval
async function getUserAndCatData(userId, catId) {
  // We can replace this mock data with actual SQL queries next - its async because it will be a database call
  const user = {
    id: userId,
    username: "Greg",
    yarn: 100,
    userRole: "regular",
  };

  const cat = {
    id: catId,
    name: "Whiskers",
    mood: 75, // Mood as a number (e.g., 0-100 scale)
    personality: "playful",
    isAlive: true,
  };

  const interactions = [
    {
      id: 1,
      interactionType: "play",
      interactionDate: new Date("2024-10-10"),
      description: "Played with a ball of yarn.",
      userId: userId,
      catId: catId,
    },
    {
      id: 2,
      interactionType: "feed",
      interactionDate: new Date("2024-10-12"),
      description: "Fed the cat some treats.",
      userId: userId,
      catId: catId,
    },
  ];

  return { user, cat, interactions };
}
