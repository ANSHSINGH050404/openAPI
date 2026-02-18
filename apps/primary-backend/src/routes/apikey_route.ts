import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { createApiKey, getApiKeys, disableApiKey, deleteApiKey, enableApiKey } from "../controllers/apikey/apikey_controller";

const route = express.Router();

route.get("/",authMiddleware,getApiKeys)
route.post("/",authMiddleware,createApiKey)
route.put("/",authMiddleware,disableApiKey)
route.put("/enable",authMiddleware,enableApiKey)
route.delete("/:id",authMiddleware,deleteApiKey)

export default route;