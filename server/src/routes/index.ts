import { Router } from "express";
import apiRoutes from "./api/index.js";

const router = Router();

// right now we access the routes without auth. the middleware will be added later
router.use("/api", apiRoutes);

export default router;
