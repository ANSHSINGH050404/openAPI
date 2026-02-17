import type { Request, Response } from "express";



export const profileController = (req:Request,res:Response) => {
    return res.json(req.user)
}
