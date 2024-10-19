import { Request, Response } from "express";
import { User } from "../models/user.js";

// GET /users - get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /user/:id - update a user by id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, userRole, bio } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      user.username = username;
      user.password = password; // password will be hashed beforeUpdate, this is defined in a hook
      user.email = email;
      user.userRole = userRole; // stil need to discuss with the team how this is going to be treated
      user.bio = bio;
      // yarn gets updated automatically, it's not something that the user updates. Therefore I am not updating the yarn property.
      await user.save();
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
