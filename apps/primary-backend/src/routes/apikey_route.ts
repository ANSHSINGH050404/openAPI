import express from "express";
import { authMiddleware } from "../middlewares/auth";
import { createApiKey, getApiKeys, disableApiKey, deleteApiKey } from "../controllers/apikey/apikey_controller";

const route = express.Router();

route.get("/",authMiddleware,getApiKeys)
route.post("/",authMiddleware,createApiKey)
route.post("/disable",authMiddleware,disableApiKey)
route.delete("/:id",authMiddleware,deleteApiKey)

export default route;