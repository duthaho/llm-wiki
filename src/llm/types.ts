export interface LLMMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface LLMRequest {
  model: string;
  max_tokens: number;
  messages: LLMMessage[];
}

export interface LLMClient {
  complete(request: LLMRequest): Promise<string>;
}

export type LLMProvider = 'anthropic' | 'nvidia';

export const DEFAULT_MODELS: Record<LLMProvider, string> = {
  anthropic: 'claude-sonnet-4-6',
  nvidia: 'qwen/qwen3.5-397b-a17b',
};
