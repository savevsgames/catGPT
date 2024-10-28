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


