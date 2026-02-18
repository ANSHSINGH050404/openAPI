import { Router, type RequestHandler } from "express";
import { chatCompletion } from "../controllers/chatCompletion";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  "/chat/completions",
  authMiddleware as unknown as RequestHandler,
  chatCompletion,
);

export default router;
