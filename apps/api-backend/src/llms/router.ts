import { GeminiLlm } from "../providers/Gemini";
import { OpenAILlm } from "../providers/Openai";
import type { BaseLlm } from "./Base";

export function getModelProvider(model: string): BaseLlm {
  if (model.startsWith("gpt")) return new OpenAILlm();
  if (model.startsWith("gemini")) return new GeminiLlm();

  // fallback
  return new GeminiLlm();
}
