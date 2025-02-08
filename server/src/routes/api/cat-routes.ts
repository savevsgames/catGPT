import express from "express";
import {
  getAllCats,
  getCatById,
  createCat,
  updateCat,
  deleteCat,
} from "../../controllers/cat-controller.js";

const router = express.Router();

// GET /cats - get all cats
router.get("/", getAllCats);

// GET /cats/:id - get cat by id
router.get("/:id", getCatById);

// POST /cats - create a new cat
router.post("/", createCat);

//PUT /cats/:id - update a cat by id
router.put("/:id", updateCat);

//DELETE /cats/:id - delete a cat by id
router.delete("/:id", deleteCat);

export { router as catRouter};