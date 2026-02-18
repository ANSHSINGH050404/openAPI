import { z } from "zod";

/**
 * Message schema
 */
export const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string()
});

/**
 * Messages array
 */
export const MessagesSchema = z.array(MessageSchema);

/**
 * Conversation schema
 */
export const ConversationSchema = z.object({
  model: z.string(),
  messages: MessagesSchema
});

/**
 * Types
 */
export type Message = z.infer<typeof MessageSchema>;
export type Messages = z.infer<typeof MessagesSchema>;
export type Conversation = z.infer<typeof ConversationSchema>;
