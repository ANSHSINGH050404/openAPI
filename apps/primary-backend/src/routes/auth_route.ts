import { Router } from "express";
import { registerController} from "../controllers/auth/register_controller";
import { loginController } from "../controllers/auth/login_controller";
import { authMiddleware } from "../middlewares/auth";
import { profileController } from "../controllers/profileController";

const router = Router();

router.post("/signup",registerController)
router.post("/signin",loginController)
router.get("/profile",authMiddleware,profileController)


export default router;