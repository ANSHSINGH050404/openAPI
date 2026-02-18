import { prisma } from "db";
import { randomBytes } from "crypto";

const API_KEY_LENGTH = 32; 
const PREFIX = "sk-or-v1-";

export abstract class ApikeyService {
    
    static generateRandomApikey(): string {
        const suffixKey = randomBytes(API_KEY_LENGTH).toString('hex');
        return `${PREFIX}${suffixKey}`;
    }

    static async createApikey(name: string, userId: number): Promise<{ id: string, apikey: string }> {
        const rawApiKey = ApikeyService.generateRandomApikey();

        console.log(rawApiKey);

        const apikeyDb = await prisma.apiKey.create({
            data: {
                name,
                apiKey: rawApiKey,
                userId
            }
        });
   

        return {
            id: apikeyDb.id.toString(),
            apikey: rawApiKey
        };
    }
}