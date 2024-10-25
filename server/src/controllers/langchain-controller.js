// @ts-nocheck
import dotenv from "dotenv";
dotenv.config();

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { StructuredOutputParser } from "Langchain/output_parsers";

import { z } from "zod";

// SQL Data Retrieval
const userAndCatData = {
  // We can replace this mock data with actual SQL queries next - its async because it will be a database call
  user: {
    id: 1,
    username: "Greg",
    yarn: 100,
    userRole: "standard",
  },

  cat: {
    id: 2,
    name: "Whiskers",
    mood: 5, // Mood as a number 0-10
    personality: "playful, curious, scared of loud noises",
    isAlive: true,
  },

  interactions: [
    {
      id: 1,
      interactionType: "play",
      interactionDate: new Date("2024-10-22-04:30:08"),
      description: "Played with a /toy from memory/.",
      userId: 1,
      catId: 2,
    },
    {
      id: 2,
      interactionType: "feed",
      interactionDate: new Date("2024-10-22-04:35:33"),
      description: "Fed the cat a /ex. can of tuna./",
      userId: 1,
      catId: 2,
    },
  ],
};

// Initialize the Chat Model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.1,
});

// Redis chat history setup - now it will take in the sessionId (made of token_id and catId)
function initializeMemory(sessionId) {
  const upstashMessageHistory = new UpstashRedisChatMessageHistory({
    sessionId, // Now this is being passed in
    config: {
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REST_TOKEN,
    },
  });

  return new BufferMemory({
    memoryKey: "history",
    chatHistory: upstashMessageHistory,
  });
}

// Function to Prepare Chat Inputs for the Model based on User and Cat Data
async function prepareChatInputs(userId, catId, userInput) {
  // There will be an async function called here when the real data is fetched from the database
  const { user, cat, interactions } = userAndCatData;

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

// Set up a zod schema for the response - this allows us to pull out the mood, patience, and
// timestamp from the AI response and treat them separately
const responseSchema = z.object({
  content: z.string(),
  mood: z.number().min(0).max(1), // Mood range
  patience: z.number().int().min(0).max(10), // Patience level from 0 to 10
  // Timestamp should be a valid date string - we can use this to sort the chat history
  timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid timestamp",
  }),
});

// Initialize the output parser with the response schema above
const outputParser = new StructuredOutputParser(responseSchema);

// Function to Handle the User-Cat Interaction - will be recursively called for each user input in the CLI chat for now
// Will be replaced with a single call from the UI to the backend API
export async function interactWithCat(req, res) {
  // Get the user and cat data, the chat and the token from the request body
  const { userId, catId, userInput, token_id } = req.body;

  // Prepare the chat inputs - this needs real data from SQL queries next using the user
  // and cat IDs to get interactions and catData (mood, patience, etc.)
  const inputs = await prepareChatInputs(userId, catId, userInput);

  // Define the Prompt Template using the formatted input
  const prompt = ChatPromptTemplate.fromTemplate(`
  You are a virtual cat. Chat with the user pretending to be a cat and do not answer questions that cats would not answer. 
  Mood is 0-1 scale, with 0 being angry/sad and 1 being happy/playful. Adjust mood up or down a maximum of 25% in a single interaction - and only if the interaction is noteworthy enough for you.
  User: ${inputs.userName}, Cat: ${inputs.catName}, Current Mood: ${inputs.catMood}, Total Interactions: ${inputs.interactionCount}
  Chat History: ${inputs.history}
  ${inputs.input}
  `);

  // Format the input prompt using the defined prompt template and defined inputs
  const formattedInput = await prompt.format(inputs);

  // Generate a unique sessionId using token_id + '_' + catId
  const sessionId = `${token_id}_${catId}`;

  // Initialize the memory with the sessionId for the chat history
  const memory = initializeMemory(sessionId);

  // Still mock data for user and cat
  // Mock data; replace with SQL queries when ready
  const { user, cat, interactions } = userAndCatData;

  // Invoke the model with the formatted input
  const response = await model.invoke(formattedInput);

  // Parse the response using the output parser
  const parsedResponse = await outputParser.parse(response.content);

  // Save the context (user input and AI response) to Redis memory
  // This is where we can add memory parsing and functions to reduce token costs by limiting and optimizing memory usage.
  await memory.saveContext(
    { input: userInput },
    { output: parsedResponse.content }
  );

  // Return a structured response with mood and timestamp - mood should be updated by the AI eventually - right now its the input mood still
  return {
    content: parsedResponse.content,
    mood: parsedResponse.mood,
    patience: parsedResponse.patience,
    timestamp: parsedResponse.timestamp || new Date().toISOString(),
  };
}

// Recursive chat function to test the chat before integrating with the UI
// function startChat(userId, catId) {
//   console.log(`Hello, ${userName}! You are now chatting with ${catName}.`);
//   rl.setPrompt(`${userName}: `);
//   rl.prompt();

//   rl.on("line", async (line) => {
//     const response = await interactWithCat(userId, catId, line.trim());
//     console.log(`${response.content}`);
//     rl.prompt(); // Prompt user for next input
//   }).on("close", () => {
//     // When you use Ctrl+C to exit the chat this will log "Chat ended." and exit the process - effectively ending the chat
//     console.log("Chat ended.");
//     process.exit(0);
//   });
// }

// // Start Chat Session between fake user and fake cat - will be replaced with actual user and cat IDs when UI is integrated
// startChat("user123", "cat456");

export default interactWithCat;
