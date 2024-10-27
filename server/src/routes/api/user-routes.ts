import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserCats,
  catsOwnedByUser,
} from "../../controllers/user-controller.js";

const router = express.Router();

// GET /users - get all users
router.get("/", getAllUsers);

// GET /users/cats -get the cats for a single user
router.get("/adoptedcats", getUserCats);

// GET /users/:id - get user by id
router.get("/:id", getUserById);

// POST /users - create a new user
router.post("/", createUser);

//PUT /users/:id - update a user by id
router.put("/:id", updateUser);

//DELETE /users/:id - delete a user by id
router.delete("/:id", deleteUser);

// number of cats owned by the user
router.get("/cats", catsOwnedByUser);

export { router as userRouter };
