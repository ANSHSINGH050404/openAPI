import express from "express";
import { authMiddleware } from "../middlewares/auth";

const route = express.Router();

route.get("/",authMiddleware)
route.post("/",authMiddleware)
route.post("/disable",authMiddleware)
route.delete("/:id",authMiddleware)

export default route;