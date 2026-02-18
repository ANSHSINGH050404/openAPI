import type { Request, Response, NextFunction } from "express";
import { PaymentsService } from "../../services/payments.service";
import { OnrampResponse, OnrampFailedResponse } from "../../schemas/payments.schema";

export const onramp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const credits = await PaymentsService.onramp(userId);

    const response = {
      message: "Onramp successful" as const,
      credits
    };

    OnrampResponse.parse(response);
    res.json(response);

  } catch (e) {
    const response = { message: "Onramp failed" as const };

    OnrampFailedResponse.parse(response);
    res.status(411).json(response);
  }
};
