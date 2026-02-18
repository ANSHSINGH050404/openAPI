import type { Request, Response, NextFunction } from "express";
import { ModelsService } from "../../services/modes_services";
import {
  GetModelsResponse,
  GetProvidersResponse,
  GetModelProvidersResponse
} from "../../schemas/models_schemas";

/* GET /models */
export const getModels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const models = await ModelsService.getModels();
    const response = { models };

    GetModelsResponse.parse(response);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

/* GET /models/providers */
export const getProviders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providers = await ModelsService.getProviders();
    const response = { providers };

    GetProvidersResponse.parse(response);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

/* GET /models/:id/providers */
export const getModelProviders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid model id" });

    const providers = await ModelsService.getModelProviders(id);
    const response = { providers };

    GetModelProvidersResponse.parse(response);
    res.json(response);
  } catch (err) {
    next(err);
  }
};
