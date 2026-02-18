import { GoogleGenAI, type Content } from "@google/genai";
import { BaseLlm, type Messages, type LlmResponse } from "../llms/Base";

export class GeminiLlm extends BaseLlm {
  provider = "gemini";
  private client: GoogleGenAI;

  constructor() {
    super();
    this.client = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }

  /**
   * Convert universal chat format → Gemini format
   */
  private toGeminiMessages(messages: Messages): Content[] {
    return messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
  }

  override async chat(model: string, messages: Messages): Promise<LlmResponse> {
    const contents = this.toGeminiMessages(messages);

    const res = await this.client.models.generateContent({
      model,
      contents,
    });

    const text =
      res.candidates?.[0]?.content?.parts
        ?.map((p) => ("text" in p ? p.text : ""))
        .join("") ?? "";

    const usage = res.usageMetadata;

    return {
      content: text,
      inputTokensConsumed: usage?.promptTokenCount ?? 0,
      outputTokensConsumed: usage?.candidatesTokenCount ?? 0,
      model,
      provider: this.provider,
      finishReason: res.candidates?.[0]?.finishReason,
    };
  }
}
