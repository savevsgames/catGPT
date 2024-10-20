import { Router } from "express";
import { userRouter } from "./user-routes.js";
import { catRouter } from "./cat-routes.js";
import { chatRouter } from "./gpt-routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/cats", catRouter);
router.use("/chat", chatRouter);

export default router;
