import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { createApiKey } from "../controllers/apikey/apikey_controller";

const route = express.Router();

route.get("/",authMiddleware)
route.post("/",authMiddleware,createApiKey)
route.post("/disable",authMiddleware)
route.delete("/:id",authMiddleware)

export default route;