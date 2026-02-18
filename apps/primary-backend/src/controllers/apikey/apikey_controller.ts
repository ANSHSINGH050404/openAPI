import { type Request, type Response } from "express";
import { ApikeyService } from "../../services/apikey";
import { prisma } from "db";
import {
  createApiKeySchema,
  apiKeyIdSchema,
} from "../../schemas/apikey.schema";

export const getApiKeys = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const apiKeys = await prisma.apiKey.findMany({
      where: { userId },
    });

    const formattedKeys = apiKeys.map((key) => ({
      id: key.id,
      name: key.name,
      creditsConsumed: key.creditsConsumed,
      lastUsed: key.lastUsed,
      disabled: key.disabled,
      apiKey: key.apiKey,
    }));

    return res.status(200).json({ success: true, data: formattedKeys });
  } catch (error) {
    console.error("Get API Keys Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const createApiKey = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const validation = createApiKeySchema.safeParse(req.body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return res.status(400).json({
        success: false,
        message: firstError?.message ?? "Validation error",
      });
    }

    const { name } = validation.data;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const result = await ApikeyService.createApikey(name, userId);

    return res.status(201).json({
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

export const disableApiKey = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const validation = apiKeyIdSchema.safeParse(req.body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return res.status(400).json({
        success: false,
        message: firstError?.message ?? "Validation error",
      });
    }

    const { id } = validation.data;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }

    const result = await prisma.apiKey.update({
      where: {
        id: id,
        userId: userId,
      },
      data: { disabled: true },
    });

    return res.status(200).json({
      success: true,
      message: "API Key disabled successfully",
      data: result,
    });
  } catch (error) {
    console.error("Disable API Key Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const enableApiKey = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const validation = apiKeyIdSchema.safeParse(req.body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return res.status(400).json({
        success: false,
        message: firstError?.message ?? "Validation error",
      });
    }

    const { id } = validation.data;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }

    const result = await prisma.apiKey.update({
      where: {
        id: id,
        userId: userId,
      },
      data: { disabled: false },
    });

    return res.status(200).json({
      success: true,
      message: "API Key enabled successfully",
      data: result,
    });
  } catch (error) {
    console.error("Enable API Key Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteApiKey = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const validation = apiKeyIdSchema.safeParse(req.params);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return res.status(400).json({
        success: false,
        message: firstError?.message ?? "Validation error",
      });
    }

    const { id } = validation.data;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Unauthorized" });
    }

    await prisma.apiKey.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "API Key deleted successfully",
    });
  } catch (error) {
    console.error("Delete API Key Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
