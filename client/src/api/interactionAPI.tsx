import Auth from "../utils/auth";

const createInteraction = async (
  catId: number,
  interactionType: "play" | "gift" | "feed"
) => {
  try {
    const response = await fetch(`api/interactions/cats/${catId}/interaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify({ interactionType }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Invalid API response");
    }

    console.log("Interaction", data);
    return data;
  } catch (error: any) {
    console.log("Error retrieving data:", error);
    return [];
  }
};
// callback function in this, once this is done console log it. sends a msg from the user to call handlesend function in lanfchain controller along with
export { createInteraction };

// get last 5 interactions of that catId and that userId

// get the user Id and cat Id with their last 5 interactions.
// when you do gift the yarn should drop
