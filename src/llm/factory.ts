import type { LLMClient, LLMProvider } from './types.js';
import { AnthropicClient } from './anthropic.js';
import { NvidiaClient } from './nvidia.js';

export function createLLMClient(provider: LLMProvider): LLMClient {
  switch (provider) {
    case 'anthropic':
      return new AnthropicClient();
    case 'nvidia':
      return new NvidiaClient();
    default:
      throw new Error(`Unknown LLM provider: ${provider}`);
  }
}
