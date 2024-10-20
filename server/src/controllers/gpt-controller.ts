import { type Request, type Response } from "express";
import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
let model: OpenAI;

// 3.5-turbo is the model we have chosen for this project. It is
// powerful enough, but also affordable, which helps us have a higher
// token limit and more robust context than we could achieve with the
// same cost as the most up to date madels.

// Temperature is set to 0 to make the responses more predictable
if (apiKey) {
  // Initialize the OpenAI model if the API key is provided
  model = new OpenAI({
    temperature: 0,
    openAIApiKey: apiKey,
    modelName: "gpt-3.5-turbo",
  });
} else {
  console.error("OPENAI_API_KEY is not configured.");
}

// Create a new prompt template for formatting prompts - this prompt template will be edited heavily in the future
// for now, to test the API, we will use a simple template that just adds the user's latest chat to the prompt in order to make sure we have
// the data we need to create the proper flow.
const promptTemplate = new PromptTemplate({
  template: `
        You are a somewhat rude, talking pet/virtual cat. Respond like a talking cat to all queries. 
        If a cat would not know the answer to a question, you should pretend not to know the answer as well. 
        \n{userChat}
    `,
  inputVariables: ["userChat"],
});

// Format the prompt using the prompt template with the user's chatInput
const formatPrompt = async (userChat: string): Promise<string> => {
  return await promptTemplate.format({ userChat });
};

// Call the OpenAI API to get a response to the formatted prompt
const promptFunc = async (input: string) => {
  try {
    if (model) {
      return await model.invoke(input);
    }
    return `No OpenAI API key provided. Unable to provide a response.`;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Handle the POST request to chat with the cat gpt -
// We will create custom interfaces for the Request
// and Response to make it more specific and allow us to
// use structured data in the request and response objects
// This will be done after testing connections to the API
export const chatWithCat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userInputData: string = req.body.userChat;

  try {
    if (!userInputData) {
      res.status(400).json({
        userChat: null,
        response: "What did you say? ... Did you type something?",
      });
      return;
    }

    const formattedPrompt: string = await formatPrompt(userInputData);
    const result: string = await promptFunc(formattedPrompt);
    res.json({
      userChat: userInputData,
      prompt: formattedPrompt,
      response: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    res.status(500).json({
      userChat: userInputData,
      prompt: null,
      response: "Internal Server Error",
    });
  }
};
