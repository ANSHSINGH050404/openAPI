import { Router } from "express";
import { onramp } from "../controllers/payments/payments.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/onramp", authMiddleware, onramp);

export default router;
