import { Router } from "express";
import {
  getModels,
  getProviders,
  getModelProviders
} from "../controllers/models/model_controller";

const router = Router();

router.get("/", getModels);
router.get("/providers", getProviders);
router.get("/:id/providers", getModelProviders);

export default router;
