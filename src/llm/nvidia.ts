import OpenAI from 'openai';
import type { LLMClient, LLMRequest } from './types.js';

const NVIDIA_BASE_URL = 'https://integrate.api.nvidia.com/v1';

export class NvidiaClient implements LLMClient {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      throw new Error('NVIDIA_API_KEY environment variable is required');
    }
    this.client = new OpenAI({
      baseURL: NVIDIA_BASE_URL,
      apiKey,
    });
  }

  async complete(request: LLMRequest): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: request.model,
      max_tokens: request.max_tokens,
      messages: request.messages,
    });

    return response.choices[0]?.message?.content ?? '';
  }
}
