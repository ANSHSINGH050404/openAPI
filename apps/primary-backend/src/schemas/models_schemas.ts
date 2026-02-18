import { z } from "zod";

/* ------------ Models ------------ */

export const GetModelsResponse = z.object({
  models: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      company: z.object({
        id: z.string(),
        name: z.string(),
        website: z.string(),
      }),
    })
  ),
});

/* ------------ Providers ------------ */

export const GetProvidersResponse = z.object({
  providers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      website: z.string(),
    })
  ),
});

/* ------------ Model Providers ------------ */

export const GetModelProvidersResponse = z.object({
  providers: z.array(
    z.object({
      id: z.string(),
      providerId: z.string(),
      providerName: z.string(),
      providerWebsite: z.string(),
      inputTokenCost: z.number(),
      outputTokenCost: z.number(),
    })
  ),
});
