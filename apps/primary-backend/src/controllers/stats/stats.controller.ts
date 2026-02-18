import type { Request, Response, NextFunction } from "express";
import { StatsService } from "../../services/stats.service";

/* GET /stats/top-users */
export const getTopTokenUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const topUsers = await StatsService.getTopTokenUsers();
    res.json({ users: topUsers });
  } catch (err) {
    next(err);
  }
};
