import { SignUpData } from "./SignUpData.tsx";

export interface UserData extends SignUpData {
  id: number | null;
  userRole: string | null;
  yarn: number | null;
  createdAt: string | null;
}
