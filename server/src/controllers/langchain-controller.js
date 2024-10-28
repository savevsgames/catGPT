// @ts-nocheck
import dotenv from "dotenv";
dotenv.config();
import { getUserCreatedAt } from "./user-controller.js";
// For ISO8601 date formatting of SQL data in wrong format
import moment from "moment";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { StructuredOutputParser } from "Langchain/output_parsers";
import { z } from "zod";
// SQL Data Retrieval
// const userAndCatData = {
//   // We can replace this mock data with actual SQL queries next
//   user: {
//     id: 1,
//     username: "Greg",
//     yarn: 100,
//     userRole: "standard",
//   },
//   cat: {
//     id: 2,
//     name: "Whiskers",
//     mood: 5, // Mood as a number 0-10
//     personality: "playful, curious, scared of loud noises",
//     isAlive: true,
//   },
//   interactions: [
//     {
//       id: 1,
//       interactionType: "play",
//       interactionDate: new Date("2024-10-22T04:33:08-06:00").toISOString(),
//       description: "Played with a /toy from memory/.",
//       userId: 1,
//       catId: 2,
//     },
//     {
//       id: 2,
//       interactionType: "feed",
//       interactionDate: new Date("2024-10-22T04:30:08-06:00").toISOString(),
//       description: "Fed the cat a /ex. can of tuna./",
//       userId: 1,
//       catId: 2,
//     },
//   ],
// };
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
  // Formats the memory object being stored to the Redis store
  return new BufferMemory({
    memoryKey: "history",
    chatHistory: upstashMessageHistory,
    format: (message) => ({
      content: message.content,
      mood: message.mood,
      patience: message.patience,
      timestamp: message.timestamp,
    }),
  });
}
// Function to Prepare Chat Inputs for the Model based on User and Cat Data
async function prepareChatInputs(user, cat, userInput) {
  // Testing the retrieval of interactions data for proper date formatting
  // console.log("Interactions data:", interactions);
  // Create a string with the 5 most recent SQL interactions between the user and cat
  //   const interactionHistory = interactions
  //     .map((interaction) => {

  //       const date = new Date(interaction.interactionDate);

  //       if (isNaN(date.getTime())) {
  //         console.error(
  //           `Invalid date encountered: ${interaction.interactionDate}`
  //         );
  // Return a string with the interaction type, on Date and description
  //     return `${interaction.interactionType} on [Invalid Date]: ${interaction.description}`;
  //   }
  //   const formattedDate = moment(date).toISOString(); // Convert to ISO format
  //   return `${interaction.interactionType} on ${formattedDate}: ${interaction.description}`;
  // })
  // .join("\n");
  return {
    userName: user.username,
    catName: cat.name,
    userYarn: user.yarn,
    catMood: cat.mood,
    catPatience: cat.patience,
    input: userInput,
    // history: interactionHistory,
  };
}
// Set up a zod schema for the response - this allows us to pull out the mood, patience, and
// timestamp from the AI response and treat them separately
const responseSchema = z.object({
  content: z.string(),
  mood: z.number().min(0).max(10), // Mood range 0 to 10
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
  const { userData, catData, userInput, createdAt } = req.body;
  const catId = catData.id;
  // Helper function to convert the localized date string to numeric-only format
  const formatDateToNumber = (dateString) => {
    if (!dateString || typeof dateString !== "string") {
      throw new Error("Invalid date string");
    }
    // Extract only numeric characters
    return dateString.replace(/[^0-9]/g, "");
  };
  const userChatDBIDraw = createdAt;
  console.log("User Chat DB ID Raw:", userChatDBIDraw);
  const userChatDBID = formatDateToNumber(userChatDBIDraw);
  console.log("User Chat DB ID:", userChatDBID);
  // Prepare the chat inputs - this needs real data from SQL queries next using the user
  // and cat IDs to get interactions and catData (mood, patience, etc.)

  // Generate a unique sessionId using user's createdAt (formatted) + '_' + catId
  const sessionId = `${userChatDBID}_${catId}`;
  console.log("Session ID:", sessionId);
  // Initialize the memory with the sessionId for the chat history
  const memory = initializeMemory(sessionId);

  // Get the chat history from the memory store
  const chatHistory = await memory.chatHistory.getMessages();
  // And make sure its prepared for the prompt template
  const formattedHistory = chatHistory
    .map((msg) => `${msg.timestamp}: ${msg.content}`)
    .join("\n");

  // Prepare the chat inputs using the user and cat data and the user input
  const inputs = await prepareChatInputs(userData, catData, userInput); //took out interactions
  // Define the Prompt Template using the formatted input
  // The example needs to be in {{ double curly braces }} to be parsed correctly by the prompt template
  const prompt = ChatPromptTemplate.fromTemplate(`
    You are a virtual cat. Chat with the user pretending to be a cat and do not answer questions that cats would not answer.
    Mood is 0-10 scale, with 0 being angry/sad and 10 being happy/playful. If the interaction is noteworthy, adjust mood +/- by integer values.
    Your goal is to live a good cat life by interacting with the user. The user can give you food or gifts or play with you. Sometimes you like to play with the gifts you get. 
    If your mood is low, you may not want to play or eat. If your patience is low, you may not want to interact with the user. Every time you interact
    with the user, your patience has a chance (% is up to you based and on cat personality) of decreasing by 1. If your patience is 0, you will
    not respond kindly. If your mood is 0, you will not respond kindly. If you receive a gift, play or food, your mood will increase.  
  
    You must respond in the following JSON format:
    {{
      "content": "<your message>",
      "mood": <new mood value between 0 and 10>,
      "patience": <patience level between 0 and 10>,
      "timestamp": "<current timestamp in ISO format>"
    }}
  
    Example:
    {{
      "content": "Meow! I am happy to see you!",
      "mood": 9,
      "patience": 7,
      "timestamp": "2024-10-25T14:23:55.123Z"
    }}
  
    User: ${inputs.userName}, Cat: ${inputs.catName}, Current Mood: ${inputs.catMood}, Cat Patience: ${inputs.catPatience} Total Interactions: ${inputs.interactionCount}
    Chat History: ${formattedHistory}
  
    User Input: ${inputs.input}
  `);
  // Format the input prompt using the defined prompt template and defined inputs
  const formattedInput = await prompt.format(inputs);

  // Invoke the model with the formatted input
  const response = await model.invoke(formattedInput);
  // Parse the response using the output parser
  const parsedResponse = await outputParser.parse(response.content);
  // Save the context (user input and AI response) to Redis memory
  // This is where we can add memory parsing and functions to reduce token costs by limiting and optimizing memory usage.
  await memory.saveContext(
    { input: userInput, speaker: inputs.userName },
    { output: parsedResponse.content, speaker: inputs.catName }
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
