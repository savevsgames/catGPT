// import Auth from '../utils/auth';
import { SignUpData } from "../interfaces/SignUpData";
import { ApiMessage } from "../interfaces/ApiMessage";
import { UserData } from "../interfaces/userData"

// get all users
const retrieveUsers = async () => {
  try {
    const response = await fetch("/api/users", {
      headers: {
        "Content-Type": "application/json",
        // include auth in the response headers once done
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("invalid user API response");
    }
    return data;
  } catch (error: any) {
    console.log("Error retrieving data:", error);
    return [];
  }
};

// retrieve user data by id -this is mostly for the Profile page
const retrieveUser = async (id: number | null): Promise<UserData> => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        // include auth in the response headers once done
      },
    });

    const data = await response.json();

    // check the response
    if (!response.ok) {
      throw new Error("Invalid API response");
    }

    return data;
  } catch (error) {
    console.log("Error retrieving data", error);
    return Promise.reject("Could not fetch user by id");
  }
};

// POST
const createUser = async (body: SignUpData) => {
  try {
    const response = await fetch("/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // include auth in the response headers once done
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Invalid API response");
    }

    return data;
  } catch (error) {
    console.log("Error retrieving data", error);
    return Promise.reject("Could not fetch user by id");
  }
};

// update the user, maybe we'll have a button the Profile page that would have update your profile or something

const updateUser = async (id: number, body: UserData): Promise<UserData> => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // include auth in the response headers once done
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error retrieving user by id");
    }

    return data;
  } catch (error) {
    console.log("Error retrieving data", error);
    return Promise.reject("Could not fetch user by id");
  }
};

const deleteUser = async (id: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // include auth in the response headers once done
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Invalid API response");
    }
    return data;
  } catch (error) {
    console.log("Error retrieving data", error);
    return Promise.reject("Could not fetch user by id");
  }
};

export { retrieveUsers, retrieveUser, createUser, updateUser, deleteUser };
