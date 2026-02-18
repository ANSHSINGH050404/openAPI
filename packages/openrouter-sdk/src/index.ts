import axios, { AxiosInstance } from "axios";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
}

export interface ChatCompletionResponse {
  choices: {
    message: ChatMessage;
  }[];
}

export class OpenRouterClient {
  private client: AxiosInstance;

  constructor(
    apiKey: string,
    baseURL: string = "http://localhost:5001/api/v1",
  ) {
    this.client = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  public chat = {
    completions: {
      create: async (
        body: ChatCompletionRequest,
      ): Promise<ChatCompletionResponse> => {
        const response = await this.client.post<ChatCompletionResponse>(
          "/chat/completions",
          body,
        );
        return response.data;
      },
    },
  };
}
