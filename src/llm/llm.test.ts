import { describe, it, expect } from 'vitest';
import { createLLMClient } from './factory.js';
import { DEFAULT_MODELS } from './types.js';
import { AnthropicClient } from './anthropic.js';
import { NvidiaClient } from './nvidia.js';

describe('DEFAULT_MODELS', () => {
  it('should have defaults for all providers', () => {
    expect(DEFAULT_MODELS.anthropic).toBe('claude-sonnet-4-6');
    expect(DEFAULT_MODELS.nvidia).toBe('qwen/qwen3.5-397b-a17b');
  });
});

describe('createLLMClient', () => {
  it('should create AnthropicClient for anthropic provider', () => {
    const client = createLLMClient('anthropic');
    expect(client).toBeInstanceOf(AnthropicClient);
  });

  it('should create NvidiaClient for nvidia provider when API key is set', () => {
    const original = process.env.NVIDIA_API_KEY;
    process.env.NVIDIA_API_KEY = 'test-key';
    try {
      const client = createLLMClient('nvidia');
      expect(client).toBeInstanceOf(NvidiaClient);
    } finally {
      if (original === undefined) delete process.env.NVIDIA_API_KEY;
      else process.env.NVIDIA_API_KEY = original;
    }
  });

  it('should throw when NVIDIA_API_KEY is missing', () => {
    const original = process.env.NVIDIA_API_KEY;
    delete process.env.NVIDIA_API_KEY;
    try {
      expect(() => createLLMClient('nvidia')).toThrow('NVIDIA_API_KEY');
    } finally {
      if (original !== undefined) process.env.NVIDIA_API_KEY = original;
    }
  });

  it('should throw for unknown provider', () => {
    expect(() => createLLMClient('unknown' as any)).toThrow('Unknown LLM provider');
  });
});
