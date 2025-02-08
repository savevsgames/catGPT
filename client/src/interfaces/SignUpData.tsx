import { UserLogin } from "./UserLogin"

export interface SignUpData extends UserLogin {
    email: string | null;
    bio?: string | null;
}