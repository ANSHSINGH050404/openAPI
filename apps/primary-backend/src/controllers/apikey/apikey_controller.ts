import type { Request, Response } from "express";
import { ApikeyService } from "../../services/apikey";

export const getApiKeys = (req: Request, res: Response) => {};

export const createApiKey = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.user?.id;

    if (!userId || !name) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const result = await ApikeyService.createApikey(name, userId);

    return res
      .status(201)
      .json({
        success: true,
        message: "Apikey created successfully",
        id: result.id,
        apikey: result.apikey,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const disableApiKey = (req: Request, res: Response) => {};

export const deleteApiKey = (req: Request, res: Response) => {};
