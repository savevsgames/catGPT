import { Router } from "express";
import apiRoutes from "./api/index.js";
import authRoutes from './auth-routes.js';
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

router.use("/auth", authRoutes);
// uncomment line 10 if you want to continue without auth for testing and comment out line 12.
// router.use("/api", apiRoutes);
// added middleware for authetication for all apiRoutes.
router.use("/api", authenticateToken, apiRoutes);

export default router;
