import {z} from "zod";

export namespace ApiKey {
export const createApiKeySchema = z.object({
    name:z.string(),
    
})

export type createApiKeySchema = z.infer<typeof createApiKeySchema>


export const disableApiKeySchema = z.object({
    id:z.string(),
})

export type disableApiKeySchema = z.infer<typeof disableApiKeySchema>

export const createApiKeyResponseSchema = z.object({
    id:z.string(),
    apikey:z.string(),
})

export type createApiKeyResponseSchema = z.infer<typeof createApiKeyResponseSchema>

export const disableApiKeyResponseSchema = z.object({
  message:z.literal("Disable the apikey successfully")
})

export type disableApiKeyResponseSchema = z.infer<typeof disableApiKeyResponseSchema>

export const getApikeyResponseSchema = z.object({
    id:z.string(),
    apikey:z.string(),
    lastUsed:z.string(),
    creditsConsumed:z.number(),
})

export type getApikeyResponseSchema = z.infer<typeof getApikeyResponseSchema>


export const deleteApiKeyResponseSchema = z.object({
    message:z.literal("Delete the apikey successfully")
})

export type deleteApiKeyResponseSchema = z.infer<typeof deleteApiKeyResponseSchema>

}