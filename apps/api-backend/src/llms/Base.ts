import type { Messages } from "../types";

export type { Messages };

export type LlmResponse = {
  content: string;
  model: string;
  provider: string;
  inputTokensConsumed: number;
  outputTokensConsumed: number;
  finishReason?: string | null;
};

export class BaseLlm {
  async chat(model: string, messages: Messages): Promise<LlmResponse> {
    throw new Error("Not implemented chat function");
  }
}
