import { Router } from "express";
import authRoutes from "./auth-routes.js";
import { authenticateToken } from "../middleware/auth.js";
import apiRoutes from "./api/index.js";

const router = Router();

router.use("/auth", authRoutes);

// added middleware for authetication for all apiRoutes.
router.use("/api", authenticateToken, apiRoutes);

export default router;
