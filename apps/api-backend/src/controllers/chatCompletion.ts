import express from "express";
import { getModelProvider } from "../llms/router";

export const chatCompletion = async (req: express.Request, res: express.Response) => {


  try {
    const { model, messages } = req.body;

    if (!model || !messages) {
      return res.status(400).json({
        error: "model and messages required"
      });
    }

    const provider = getModelProvider(model);

    const llmResponse = await provider.chat(model, messages);

    // Return OpenAI compatible response
    return res.json({
      id: "chatcmpl-" + crypto.randomUUID(),
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: llmResponse.content
          },
          finish_reason: llmResponse.finishReason ?? "stop"
        }
      ],
      usage: {
        prompt_tokens: llmResponse.inputTokensConsumed,
        completion_tokens: llmResponse.outputTokensConsumed,
        total_tokens:
          llmResponse.inputTokensConsumed +
          llmResponse.outputTokensConsumed
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "LLM request failed"
    });
  }

}