// @ts-nocheck
import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";

// Temporarily using readline for testing the chat - will be replaced with the UI integration
import readline from "readline";

// Set up the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// SQL Data Retrieval
async function getUserAndCatData(userId, catId) {
  // We can replace this mock data with actual SQL queries next - its async because it will be a database call
  const user = {
    id: userId,
    username: "Greg",
    yarn: 100,
    userRole: "standard",
  };

  const cat = {
    id: catId,
    name: "Whiskers",
    mood: 0.75, // Mood as a number 0-1
    personality: "playful, curious, scared of loud noises",
    isAlive: true,
  };

  const interactions = [
    {
      id: 1,
      interactionType: "play",
      interactionDate: new Date("2024-10-22-04:30:08"),
      description: "Played with a /toy from memory/.",
      userId: userId,
      catId: catId,
    },
    {
      id: 2,
      interactionType: "feed",
      interactionDate: new Date("2024-10-22-04:35:33"),
      description: "Fed the cat a /ex. can of tuna./",
      userId: userId,
      catId: catId,
    },
  ];

  return { user, cat, interactions };
}

// Mock Data - hardcoded for now - will be replaced with state values pulled from the database/clicked on the UI
// const catAndUserData = await getUserAndCatData("user123", "cat456");

// Initialize the Chat Model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.1,
});

// Redis-based Chat History Initialization using Upstash-Redis DB
const upstashMessageHistory = new UpstashRedisChatMessageHistory({
  sessionId: "catSession01", // Unique session ID with UUID or similar
  config: {
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REST_TOKEN,
  },
});

// Memory Setup with BufferMemory
const memory = new BufferMemory({
  memoryKey: "history",
  chatHistory: upstashMessageHistory,
});

// Function to Prepare Chat Inputs for the Model based on User and Cat Data
async function prepareChatInputs(userId, catId, userInput) {
  // This will be async when the real data is fetched from the database
  const { user, cat, interactions } = await getUserAndCatData(userId, catId);

  // History of interactions - injected into a string for clean input into the prompt
  const interactionHistory = interactions
    .map(
      (interaction) =>
        `${
          interaction.interactionType
        } on ${interaction.interactionDate.toDateString()}: ${
          interaction.description
        }`
    )
    .join("\n");

  return {
    userName: user.username,
    catName: cat.name,
    userYarn: user.yarn,
    catMood: cat.mood,
    interactionCount: interactions.length,
    input: userInput,
    history: interactionHistory,
  };
}

// Define the Prompt Template
const prompt = ChatPromptTemplate.fromTemplate(`
  You are a virtual cat. Chat with the user pretending to be a cat and do not answer questions that cats would not answer. 
  Mood is 0-1 scale, with 0 being angry/sad and 1 being happy/playful. Adjust mood up or down a maximum of 25% in a single interaction - and only if the interaction is noteworthy enough for you.
  User: {userName}, Cat: {catName}, Current Mood: {catMood}, Total Interactions: {interactionCount}
  Chat History: {history}
  {input}
  `);

// Function to Handle the User-Cat Interaction - will be recursively called for each user input in the CLI chat for now
// Will be replaced with a single call from the UI to the backend API
async function interactWithCat(userId, catId, userInput) {
  const inputs = await prepareChatInputs(userId, catId, userInput);

  // Format the inputs using the defined prompt template
  const formattedInput = await prompt.format(inputs);

  // Invoke the model with the formatted input
  const response = await model.invoke(formattedInput);

  // Save the context (user input and AI response) to Redis memory
  await memory.saveContext({ input: userInput }, { output: response.content });

  // Return a structured response with mood and timestamp
  return {
    content: response.content,
    mood: inputs.catMood,
    timestamp: new Date().toISOString(),
  };
}

// Recursive chat function to test the chat before integrating with the UI
function startChat(userId, catId) {
  console.log(
    `Hello, ${user.username}! You are now chatting with ${cat.name}.`
  );
  rl.setPrompt(`${user.username}: `);
  rl.prompt();

  rl.on("line", async (line) => {
    const response = await interactWithCat(userId, catId, line.trim());
    console.log(`${response.content}`);
    rl.prompt(); // Prompt user for next input
  }).on("close", () => {
    // When you use Ctrl+C to exit the chat this will log "Chat ended." and exit the process - effectively ending the chat
    console.log("Chat ended.");
    process.exit(0);
  });
}

// Start Chat Session between fake user and fake cat - will be replaced with actual user and cat IDs when UI is integrated
startChat("user123", "cat456");
