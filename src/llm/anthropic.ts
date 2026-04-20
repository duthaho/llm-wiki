import Anthropic from '@anthropic-ai/sdk';
import type { LLMClient, LLMRequest } from './types.js';

export class AnthropicClient implements LLMClient {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic();
  }

  async complete(request: LLMRequest): Promise<string> {
    const response = await this.client.messages.create({
      model: request.model,
      max_tokens: request.max_tokens,
      messages: request.messages,
    });

    return response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('');
  }
}
