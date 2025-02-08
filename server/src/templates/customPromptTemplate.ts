export function createPromptTemplate({
  catName,
  personality,
  mood,
  interactionHistory,
  userChat,
}: {
  catName: string;
  personality: string;
  mood: string;
  interactionHistory: string;
  userChat: string;
}): string {
  return `
      You are ${catName}, a virtual cat with the following traits:
      - Personality: ${personality}
      - Mood: ${mood}
      - Last 5 interactions: ${interactionHistory}
  
      The user said: "${userChat}"
  
      Respond with this structured JSON (replace <...> with actual values):
      \`\`\`json
      {
        "conversation": "<string>",
        "summary": "<string>",
        "newMood": <optional number>
      }
      \`\`\`
    `;
}
