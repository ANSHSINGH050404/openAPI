import express from "express";
import { prisma } from "db";
import { ConversationSchema } from "../schemas/conversation";
import { Gemini } from "../llms/Gemini";
import { OpenAi } from "../llms/Openai";

export const chatCompletion = async (
  req: express.Request,
  res: express.Response,
) => {
  const parsed = ConversationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);

  const { model, messages } = parsed.data;
  const [_company, providerModelName] = model.split("/");

  if (!providerModelName) {
    return res.status(400).json({
      message: "Invalid model format. Expected 'provider/model'",
    });
  }

  const modelDb = await prisma.model.findFirst({
    where: { slug: model },
  });

  if (!modelDb) return res.status(404).json({ message: "Model not supported" });

  const providers = await prisma.modelProviderMapping.findMany({
    where: { modelId: modelDb.id },
    include: { provider: true },
  });

  const provider = providers[Math.floor(Math.random() * providers.length)];

  if (!provider) return res.status(404).json({ message: "No provider found" });

  let response = null;

  if (provider.provider.name === "Google AI") {
    response = await Gemini.chat(providerModelName, messages);
  }

  if (provider.provider.name === "OpenAI") {
    response = await OpenAi.chat(providerModelName, messages);
  }

  if (!response)
    return res.status(500).json({
      message: "Provider failed",
      debug: {
        providerName: provider.provider.name,
        modelRequested: providerModelName,
      },
    });

  // cost calculation
  const creditsUsed =
    (response.inputTokensConsumed * provider.inputTokenCost +
      response.outputTokensConsumed * provider.outputTokenCost) /
    10;

  const user = (req as any).user;
  const apiKey = (req as any).apiKey;

  await prisma.user.update({
    where: { id: user.id },
    data: { credits: { decrement: creditsUsed } },
  });

  await prisma.apiKey.update({
    where: { apiKey },
    data: { creditsConsumed: { increment: creditsUsed } },
  });

  res.json(response);
};
