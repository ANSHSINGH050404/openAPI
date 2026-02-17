import type { Request, Response } from "express";
import { ApikeyService } from "../../services/apikey";
import { prisma } from "db";

export const getApiKeys = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const apiKey = await prisma.apiKey.findMany({
      where: {
        userId: userId,
      },    
    });
    return apiKey.map((key) => {
      return {
        id: key.id,
        name: key.name,
        creditsConsumed: key.creditsConsumed,
        lastUsed: key.lastUsed,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Apikeys fetched successfully",
      data: apiKey,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const createApiKey = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.user?.id;

    if (!userId || !name) {
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

    const {userId} =req.user;
    const {apiKeyId} = req.body;


    if(!userId || !apiKeyId){
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const result = await prisma.apiKey.update({
        where: {
            id: apiKeyId,
            userId:userId,
        },
        data:{
            disabled:true,
        }
    });

    return res.status(200).json({
        success: true,
        message: "Apikey disabled successfully",
        data: result,
    });

    

};

export const deleteApiKey = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {userId} = req.user;

    if(!userId || !id){
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const result = await prisma.apiKey.delete({
        where: {
            id: Number(id),
            userId:userId,
        },
    });

    return res.status(200).json({
        success: true,
        message: "Apikey deleted successfully",
        data: result,
    });

    
};
