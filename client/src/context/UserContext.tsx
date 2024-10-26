import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { UserData } from "../interfaces/userData";

interface UserContextType {
    user: UserData | null;
    setUser: Dispatch<SetStateAction<UserData | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};