import { prisma } from "db";
import type { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.message,
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password";

  if (!user) {
    return res.status(401).json({
      success: false,
      message: INVALID_CREDENTIALS_MESSAGE,
    });
  }

  const isPasswordValid = await Bun.password.verify(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: INVALID_CREDENTIALS_MESSAGE,
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
    token,
  });
};
