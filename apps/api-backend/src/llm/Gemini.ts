import { GoogleGenAI } from "@google/genai";
import type { Messages, LlmResponse } from "../types";
import { BaseLlm } from "./base";

export class GeminiLlm extends BaseLlm {
  private client: GoogleGenAI;

  constructor(apiKey: string) {
    super("google");
    this.client = new GoogleGenAI({ apiKey });
  }

  async chat(model: string, messages: Messages): Promise<LlmResponse> {
    const response = await this.client.models.generateContent({
      model,
      contents: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }))
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return {
      content: text,
      usage: {
        inputTokens: response.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
        totalTokens: response.usageMetadata?.totalTokenCount ?? 0
      },
      model,
      provider: this.provider
    };
  }
}
