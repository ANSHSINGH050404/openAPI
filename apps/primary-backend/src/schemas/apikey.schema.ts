import { z } from "zod";

export const createApiKeySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be at most 100 characters" })
    .trim(),
});

export const apiKeyIdSchema = z.object({
  id: z.coerce.number().int().positive("ID must be a positive integer"),
});

export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
export type ApiKeyIdInput = z.infer<typeof apiKeyIdSchema>;
