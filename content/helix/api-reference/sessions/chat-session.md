---
title: Chat Completions
weight: 1
prev: /helix/api-reference/sessions/_index.md
aliases:
- /docs/chat-session
tags:
- api
- chat
---

The chat completions endpoint is OpenAI-compatible and supports both direct model access and agent interactions.

## Basic Request

```bash
curl -X POST 'https://app.tryhelix.ai/v1/chat/completions' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "qwen3:8b",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "What is the capital of France?"}
    ]
  }'
```

Response:

```json
{
  "id": "ses_01a4t10c132825d3k037tyh7ap",
  "object": "chat.completion",
  "created": 1723155364,
  "model": "qwen3:8b",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "The capital of France is Paris."
      }
    }
  ],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 8,
    "total_tokens": 32
  }
}
```

## Streaming

Enable streaming for real-time responses:

```bash
curl -X POST 'https://app.tryhelix.ai/v1/chat/completions' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "qwen3:8b",
    "messages": [
      {"role": "user", "content": "Tell me a story"}
    ],
    "stream": true
  }'
```

## Using with Agents

To use a specific agent, use an agent-specific API key (generated in agent settings). The agent's configuration, including system prompt, knowledge, and tools, will be automatically applied.

```bash
curl -X POST 'https://app.tryhelix.ai/v1/chat/completions' \
  -H 'Authorization: Bearer YOUR_AGENT_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "qwen3:8b",
    "messages": [
      {"role": "user", "content": "What can you help me with?"}
    ]
  }'
```

## Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `model` | string | Model identifier (e.g., `qwen3:8b`, `llama3:instruct`) |
| `messages` | array | Array of message objects with `role` and `content` |
| `stream` | boolean | Enable streaming responses |
| `temperature` | number | Sampling temperature (0-2) |
| `max_tokens` | integer | Maximum tokens to generate |
| `top_p` | number | Nucleus sampling parameter |

## Message Roles

| Role | Description |
|------|-------------|
| `system` | Sets the behavior of the assistant |
| `user` | Messages from the user |
| `assistant` | Previous assistant responses (for context) |

## Python Example

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://app.tryhelix.ai/v1",
    api_key="YOUR_API_KEY"
)

# Basic completion
response = client.chat.completions.create(
    model="qwen3:8b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)
print(response.choices[0].message.content)

# Streaming
stream = client.chat.completions.create(
    model="qwen3:8b",
    messages=[{"role": "user", "content": "Tell me a story"}],
    stream=True
)
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

## JavaScript Example

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://app.tryhelix.ai/v1',
  apiKey: 'YOUR_API_KEY',
});

const response = await client.chat.completions.create({
  model: 'qwen3:8b',
  messages: [
    { role: 'user', content: 'Hello!' }
  ],
});

console.log(response.choices[0].message.content);
```
