import type { Request, Response, NextFunction } from "express";
import { prisma } from "db";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "Missing API key" });

  const apiKey = header.split(" ")[1];

  const apiKeyDb = await prisma.apiKey.findFirst({
    where: { apiKey, disabled: false, deleted: false },
    include: { user: true }
  });

  if (!apiKeyDb)
    return res.status(403).json({ message: "Invalid api key" });

  if (apiKeyDb.user.credits <= 0)
    return res.status(403).json({ message: "No credits remaining" });

  (req as any).user = apiKeyDb.user;
  (req as any).apiKey = apiKey;

  next();
}
