import { z } from "zod";

/* ---------------- Message ---------------- */

export const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system", "tool"]),
  content: z.string()
});

export type Message = z.infer<typeof MessageSchema>;

/* ---------------- Messages ---------------- */

export const MessagesSchema = z.array(MessageSchema);
export type Messages = z.infer<typeof MessagesSchema>;

/* ---------------- Conversation ---------------- */

export const ConversationSchema = z.object({
  model: z.string(),
  messages: MessagesSchema
});

export type Conversation = z.infer<typeof ConversationSchema>;

/* ---------------- LLM Response ---------------- */

export type LlmResponse = {
  content: string;

  usage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };

  model: string;
  provider: string;
};
