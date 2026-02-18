import { z } from "zod";

/* Success */
export const OnrampResponse = z.object({
  message: z.literal("Onramp successful"),
  credits: z.number(),
});

/* Failed */
export const OnrampFailedResponse = z.object({
  message: z.literal("Onramp failed"),
});

export type OnrampResponseType = z.infer<typeof OnrampResponse>;
export type OnrampFailedResponseType = z.infer<typeof OnrampFailedResponse>;
