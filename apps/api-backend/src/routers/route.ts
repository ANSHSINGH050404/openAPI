import { Router } from "express";
import { chatCompletion } from "../controllers/chatCompletion";

const router = Router();


router.post('/chat/completions', chatCompletion )

export default router;
