import { prisma } from "db";
import type { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";

export const registerSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = registerSchema.safeParse({ email, password });

  if (!result.success) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 10,
  });

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return res
    .status(201)
    .json({ message: "User created successfully", userId: newUser.id, token });
};
