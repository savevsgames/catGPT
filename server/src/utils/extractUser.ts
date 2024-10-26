// Function to extract the encoded payload from a JWT token to be used as the long term chat memory token
// The cat id will be appended to complete the chat memory identifier

export function extractUser(token: string): string | null {
  try {
    const parts = token.split("."); // Split the token into parts.

    // Check if the token has the correct number of parts / is valid.
    if (parts.length !== 3) {
      console.error("Invalid token format");
      return null;
    }
    console.log("Payload:", parts[1]);
    // Return the first 10 characters of the encoded payload from the token.
    return parts[1];
  } catch (error) {
    console.error("Error extracting encoded payload:", error);
    return null;
  }
}

export default extractUser;

// eyJ1c2VybmFtZSI6ImEiLCJpZCI6NywiaWF0IjoxNzI5OTI0NzI4LCJleHAiOjE3Mjk5MzE5Mjh9
// eyJ1c2VybmFtZSI6IkdHIiwiaWQiOjYsImlhdCI6MTcyOTkyNTEwOCwiZXhwIjoxNzI5OTMyMzA4fQ
// eyJ1c2VybmFtZSI6IkdHIiwiaWQiOjYsImlhdCI6MTcyOTkyNTE0NCwiZXhwIjoxNzI5OTMyMzQ0fQ
// eyJ1c2VybmFtZSI6IkdHIiwiaWQiOjYsImlhdCI6MTcyOTkyNTE3OCwiZXhwIjoxNzI5OTMyMzc4fQ
