export interface InteractionData {
  id: number | null;
  interactionType: "play" | "gift" | "feed" | null;
  interactionDate: Date | null;
  description: string | null;
  userId : number | null;
  catId: number | null;
};