import type { Messages } from "../schemas/conversation";
import { BaseLlm, type LlmResponse } from "./Base";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export class OpenAi extends BaseLlm {
  static override async chat(
    model: string,
    messages: Messages,
  ): Promise<LlmResponse> {
    const response = await client.responses.create({
      model,
      input: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const input = response.usage?.input_tokens ?? 0;
    const output = response.usage?.output_tokens ?? 0;

    return {
      inputTokensConsumed: input,
      outputTokensConsumed: output,
      totalTokensConsumed: input + output,
      completions: {
        choices: [
          {
            message: {
              content: response.output_text ?? "",
            },
          },
        ],
      },
      model,
      provider: "openai",
    };
  }
}
