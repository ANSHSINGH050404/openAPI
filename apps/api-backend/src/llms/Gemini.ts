import type { Messages } from "../types";
import { BaseLlm, type LlmResponse } from "./Base";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!
});

export class Gemini extends BaseLlm {
  static override async chat(model: string, messages: Messages): Promise<LlmResponse> {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: messages.map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        }))
      });

      const input = response.usageMetadata?.promptTokenCount ?? 0;
      const output = response.usageMetadata?.candidatesTokenCount ?? 0;

      return {
        inputTokensConsumed: input,
        outputTokensConsumed: output,
        totalTokensConsumed: input + output,
        completions: {
          choices: [{
            message: {
              content: response.text ?? ""
            }
          }]
        }
      };

    } catch (err) {
      console.error("Gemini error:", err);
      return null as any;
    }
  }
}
