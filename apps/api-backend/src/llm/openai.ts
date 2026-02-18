import OpenAI from "openai";
import type { Messages, LlmResponse } from "../types";
import { BaseLlm } from "./base";

export class OpenAi extends BaseLlm {
  private client: OpenAI;

  constructor(apiKey: string) {
    super("openai");
    this.client = new OpenAI({ apiKey });
  }

  async chat(model: string, messages: Messages): Promise<LlmResponse> {
    const response = await this.client.responses.create({
      model,
      input: messages.map((m) => ({
        role: m.role,
        content: [
          {
            type: "text",
            text: m.content
          }
        ]
      }))
    });

    // Extract text safely
    let text = "";
    for (const output of response.output ?? []) {
      if (output.type === "message") {
        for (const part of output.content ?? []) {
          if (part.type === "output_text") {
            text += part.text;
          }
        }
      }
    }

    return {
      content: text,

      usage: {
        inputTokens: response.usage?.input_tokens ?? 0,
        outputTokens: response.usage?.output_tokens ?? 0,
        totalTokens: response.usage?.total_tokens ?? 0
      },

      model,
      provider: this.provider
    };
  }
}
