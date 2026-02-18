import { z } from "zod";

export const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string()
});

export const MessagesSchema = z.array(MessageSchema);

export const ConversationSchema = z.object({
  model: z.string(),
  messages: MessagesSchema
});

export type Messages = z.infer<typeof MessagesSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;
