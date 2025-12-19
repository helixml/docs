---
title: API Reference
weight: 8
prev: /helix/private-deployment/_index.md
aliases:
- /docs/api
tags:
- api
---

Helix provides an OpenAI-compatible REST API for interacting with agents, sessions, and resources.

## Authentication

All API requests require authentication via an API key in the `Authorization` header:

```
Authorization: Bearer YOUR_API_KEY
```

Get your API key from the [Account page](https://app.tryhelix.ai/account) or generate agent-specific keys in agent settings.

## Base URL

```
https://app.tryhelix.ai/api/v1
```

For private deployments, use your deployment URL.

## OpenAI Compatibility

The chat completions endpoint is fully compatible with OpenAI's API:

```bash
curl -X POST https://app.tryhelix.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3:8b",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

This means you can use the OpenAI SDK:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://app.tryhelix.ai/v1",
    api_key="YOUR_API_KEY"
)

response = client.chat.completions.create(
    model="qwen3:8b",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

## Key Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /v1/chat/completions` | OpenAI-compatible chat completions |
| `GET /api/v1/apps` | List agents |
| `GET /api/v1/apps/{id}` | Get agent details |
| `GET /api/v1/sessions` | List sessions |
| `GET /api/v1/sessions/{id}` | Get session details |
| `GET /api/v1/knowledge` | List knowledge bases |
| `GET /api/v1/knowledge/{id}` | Get knowledge details |

## Interactive Documentation

Access the full interactive API documentation at `/api-reference` on your Helix deployment:

- **SaaS**: [app.tryhelix.ai/api-reference](https://app.tryhelix.ai/api-reference)
- **Private**: `https://your-deployment/api-reference`

## OpenAPI Specification

The complete OpenAPI spec is available at:
- [swagger.yaml](https://github.com/helixml/helix/blob/main/api/pkg/server/swagger.yaml)

<!--more-->

{{< default-section-cards-list >}}
