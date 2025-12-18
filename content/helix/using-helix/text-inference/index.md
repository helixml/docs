---
title: Text Inference
description:
weight: 1
aliases:
  - /docs/text-inference
  - /helix/models/models/
---

Helix supports any model available through Ollama or vLLM. The platform dynamically detects model types—if a model name contains a colon (like `qwen3:8b`), it runs through Ollama. Models with a slash prefix (like `Qwen/Qwen2.5-VL-7B-Instruct`) run through vLLM.

## Listing Available Models

Query the Helix API to see which models are configured on your instance:

```bash
curl -s https://your-helix-server/v1/models \
  -H "Authorization: Bearer $HELIX_API_KEY" | jq
```

Or using the CLI:

```bash
helix agent ls
```

## Adding Models

Administrators can add any Ollama or vLLM model. For Ollama models, use the standard Ollama tag format (e.g., `llama3:instruct`, `qwen3:32b`, `mixtral:instruct`). For vLLM models, use the HuggingFace model path (e.g., `Qwen/Qwen2.5-VL-7B-Instruct`).

Models are configured in the Helix admin interface or via the Models API. Each model can specify memory requirements, context length, concurrency limits, and whether to prewarm on runners.

## Running Inference

Send a chat completion request to the OpenAI-compatible API:

```bash
curl https://your-helix-server/v1/chat/completions \
  -H "Authorization: Bearer $HELIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3:8b",
    "messages": [{"role": "user", "content": "Explain quantum computing in simple terms"}]
  }'
```

The scheduler automatically routes requests to available runners with sufficient GPU memory for the requested model.
