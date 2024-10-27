import { Request, Response } from "express";
import { User, Cat } from "../models/index.js";

// GET /users - get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    console.log("Users found:", users);

    if (!users || users.length === 0) {
      res.status(404).json({ message: "No users found" });
      console.log("issue getting users");
    }

    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET all user cats /users/adoptedcats
export const getUserCats = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  console.log("userId is", userId); // testing
  if (!userId) {
    console.log("User not authenticated or not found");
    res.status(401).json({ message: "User not authenticated or not found" });
    return; // Respond immediately if user is not found
  }

  try {
    const userCats = await Cat.findAll({
      where: { userId },
    });

    // Check if the user has any cats
    if (!userCats || userCats.length === 0) {
      res.status(404).json({ message: "No cats associated with this user" });
      return;
    }
    // Respond with the list of cats if found
    res.status(200).json(userCats);
    return;
  } catch (error: any) {
    console.error("Error fetching user cats:", error); // Log the error for debugging
    res.status(500).json({ message: error.message }); // Send the error message
    return;
  }
};

// helper function: creating a getUserById function for the createInteraction and
export const getUser = async (userId: number) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.error("error getting user");
    }
    console.log("getUser function returned this user:", user);
    return user;
  } catch (error) {
    console.error(error, "error getting user");
    throw error;
  }
};

// GET /users/:id - get a user by their id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /users - create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, bio } = req.body;

    // validate required fields
    if (!username || !password || !email) {
      res
        .status(400)
        .json({ message: "Username, password, and email are required." });
    }

    // check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email is already in use." });
    }

    // Create a new user, with a default userRole
    const newUser = await User.create({
      username,
      password,
      email,
      userRole: "standard", // Default role
      bio,
      yarn: 200, // Default value
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /user/:id - update a user by id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, bio } = req.body;
    const updatedUser = await User.findByPk(req.params.id);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      updatedUser.username = username;
      updatedUser.password = password;
      updatedUser.email = email;
      updatedUser.bio = bio;
      // yarn gets updated automatically, it's not something that the updatedUser updates. Therefore I am not updating the yarn property.
      console.log("before save");
      await updatedUser.save();
      console.log("saved");
      res.status(201).json(updatedUser);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /user/:id - delete user by id/ not sure if we're going to use this. but it's here for now
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.destroy();
      res.status(201).json({ message: "User has been deleted" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /user/:userId/cats -get the count of cats owned by the user
export const catsOwnedByUser = async (req: Request, res: Response) => {
  try {
    // make sure the user id is a number
    const userId = Number(req.params.id);
    console.log(userId);
    // find the user using the helper function
    const user = await getUser(userId);
    // get the count of cats owned by a user
    console.log(user);
    const cats = await Cat.count({
      where: { userId: user?.id },
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["username"],
        },
      ],
    });
    console.log(cats);
    res.status(200).json(cats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// get /users/:userId/createdAt
export const getUserCreatedAt = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const user = await User.findOne({
      attributes: ["createdAt"],
      where: { id: userId },
    });
    if (user) {
      // Convert `createdAt` to a string in the local time zone
      const createdAt = new Date(user.get("createdAt") as Date).toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }
      );
      res.status(200).json(createdAt);
    } else {
      res.status(404).json("User cant be found");
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// PUT /user/:id/username - update a user's username by id
export const updateUserUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const updatedUser = await User.findByPk(req.params.id);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      updatedUser.username = username;

      await updatedUser.save();

      res.status(200).json({ message: "Username updated successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /user/:id/password - update user's password by id
export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const updatedUser = await User.findByPk(req.params.id);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      updatedUser.password = password;

      await updatedUser.save();

      res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// PUT /user/:id/bio - update user's bio by id
export const updateUserBio = async (req: Request, res: Response) => {
  try {
    const { bio } = req.body;
    const updatedUser = await User.findByPk(req.params.id);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      updatedUser.bio = bio;

      await updatedUser.save();

      res.status(200).json({ message: "Bio updated successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
