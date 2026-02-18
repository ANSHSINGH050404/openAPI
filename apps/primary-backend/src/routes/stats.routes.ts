import { Router } from "express";
import { getTopTokenUsers } from "../controllers/stats/stats.controller";

const router = Router();

router.get("/top-users", getTopTokenUsers);

export default router;
