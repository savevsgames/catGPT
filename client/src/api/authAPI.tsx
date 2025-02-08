import { SignUpData } from "../interfaces/SignUpData";
import { UserLogin } from "../interfaces/UserLogin";


const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error: ${error.message}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error logging in: ", err);
    return Promise.reject("Could not log in");
  }
};

const signup = async (newUserInfo: SignUpData) => {
  try {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error signing up");
    }
    return data;
  } catch (err) {
    console.log("Error signing up: ", err);
    return Promise.reject("Could not sign up");
  }
};

export { login, signup };
