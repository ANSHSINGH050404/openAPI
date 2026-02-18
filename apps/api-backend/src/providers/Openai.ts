import OpenAI from "openai";
import { BaseLlm, type Messages, type LlmResponse } from "../llms/Base";

export class OpenAILlm extends BaseLlm {
  provider = "openai";
  private client: OpenAI;

  constructor() {
    super();
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    });
  }

  override async chat(model: string, messages: Messages): Promise<LlmResponse> {
    const response = await this.client.chat.completions.create({
      model,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const choice = response.choices[0];

    if (!choice) {
      throw new Error("No choices returned from OpenAI");
    }

    return {
      content: choice.message.content ?? "",
      inputTokensConsumed: response.usage?.prompt_tokens ?? 0,
      outputTokensConsumed: response.usage?.completion_tokens ?? 0,
      model,
      provider: this.provider,
      finishReason: choice.finish_reason ?? undefined,
    };
  }
}
