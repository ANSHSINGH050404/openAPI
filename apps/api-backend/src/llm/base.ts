import type { Messages, LlmResponse } from "../types";

export abstract class BaseLlm {
  constructor(protected provider: string) {}

  abstract chat(model: string, messages: Messages): Promise<LlmResponse>;
}
