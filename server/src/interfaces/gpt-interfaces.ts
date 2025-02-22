// Interface definitions for structured data handling
export interface UserChatRequest {
  userChat: string;
  userId: number;
  catId: number;
}

export interface GPTStructuredResponse {
  conversation: string;
  summary: string;
  newMood?: number;
}

export interface CatProfile {
  id: number;
  name: string;
  skin: string;
  personality: string;
  mood: number;
  deathFlag: number;
  isAlive: boolean;
  userId: number;
}
