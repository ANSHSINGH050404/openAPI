import type { Messages } from "../schemas/conversation";

export type LlmResponse = {
  completions: {
    choices: {
      message: {
        content: string;
      };
    }[];
  };

  inputTokensConsumed: number;
  outputTokensConsumed: number;
  totalTokensConsumed: number;
  model?: string;
  provider?: string;
};

export abstract class BaseLlm {
  static async chat(model: string, messages: Messages): Promise<LlmResponse> {
    throw new Error("Not implemented");
  }
}
