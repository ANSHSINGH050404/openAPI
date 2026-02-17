import { prisma } from "db";
import { createHash, randomBytes } from "crypto";

const API_KEY_LENGTH = 32; // Increased for better entropy
const PREFIX = "sk-or-v1-";

export abstract class ApikeyService {
    
    /**
     * Generates a cryptographically secure random string
     */
    static generateRandomApikey(): string {
        // Generate random bytes and convert to hex or base64
        const suffixKey = randomBytes(API_KEY_LENGTH).toString('hex');
        return `${PREFIX}${suffixKey}`;
    }

    /**
     * Hashes the key for secure storage
     */
    private static hashKey(key: string): string {
        return createHash('sha256').update(key).digest('hex');
    }

    static async createApikey(name: string, userId: number): Promise<{ id: string, apikey: string }> {
        const rawApiKey = ApikeyService.generateRandomApikey();
        const hashedKey = ApikeyService.hashKey(rawApiKey);

        const apikeyDb = await prisma.apiKey.create({
            data: {
                name,
                apiKey: hashedKey, // Store the hash, not the plain text
                userId
            }
        });

        return {
            id: apikeyDb.id.toString(),
            apikey: rawApiKey // Return the raw key to the user ONCE
        };
    }
}