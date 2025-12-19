---
title: GitOps Agents via GitHub
linkTitle: GitOps Agents
description: Deploy and manage Helix Agents directly from GitHub repositories.
weight: 2
tags:
- agents
- github
- gitops
---

Helix supports GitOps workflows by watching for agent configurations in GitHub repositories. Once connected, Helix receives webhooks from GitHub and automatically updates your agent whenever you push changes. Simply `git push` to deploy.

## How It Works

1. Create a `helix.yaml` file in your repository root
2. Connect the repository to Helix
3. Helix deploys the agent and watches for changes
4. Push commits to `main` to update your agent

## Getting Started

### 1. Create Your Agent Repository

Create a new repository from the Helix template:

https://github.com/new?template_name=example-app-api-template&template_owner=helixml

You can make the repository private - Helix only accesses repositories you explicitly grant access to.

The repository must contain a `helix.yaml` file at the root defining your agent configuration:

```yaml
name: My GitHub Agent
description: An agent deployed via GitOps

assistants:
- model: qwen3:8b
  system_prompt: |
    You are a helpful assistant.
```

### 2. Connect Your Repository

Connect your GitHub repository to Helix:

1. Navigate to **Agents** in the Helix UI
2. Click **New Agent +**
3. Select **Connect GitHub Repository**
4. Authorize Helix to access your repositories
5. Select your repository and click **Connect**

Helix clones the repository and deploys the agent. From this point, any commit to `main` triggers an automatic update via GitHub webhook.

### 3. Use Your Agent

Get your agent's API key from the **Keys** section in the agent settings, then query it via the API:

```bash
curl -X POST https://app.tryhelix.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_AGENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3:8b",
    "messages": [
      {"role": "user", "content": "Hello, how can you help me?"}
    ]
  }'
```

## Example: API Integration Agent

Here's an example `helix.yaml` for an agent that calls external APIs:

```yaml
name: Crypto Price Agent
description: Get live cryptocurrency prices

assistants:
- model: qwen3:8b
  system_prompt: |
    You help users check cryptocurrency prices. Use the Coinbase API
    to fetch current prices when asked.

  apis:
  - name: Coinbase
    description: Get cryptocurrency prices and exchange rates
    url: https://api.coinbase.com
    schema: |
      openapi: 3.0.0
      info:
        title: Coinbase API
        version: 1.0.0
      paths:
        /v2/prices/{pair}/spot:
          get:
            summary: Get spot price for a currency pair
            operationId: getSpotPrice
            parameters:
            - name: pair
              in: path
              required: true
              schema:
                type: string
              description: Currency pair (e.g., BTC-USD, ETH-GBP)
```

Query the agent:

```bash
curl -X POST https://app.tryhelix.ai/v1/chat/completions \
  -H "Authorization: Bearer YOUR_AGENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen3:8b",
    "messages": [
      {"role": "user", "content": "What is the current Bitcoin price in GBP?"}
    ]
  }'
```

Response:

```json
{
  "id": "51aaec1f-0ed4-4a06-815a-23171f69aa0c",
  "object": "chat.completion",
  "choices": [
    {
      "index": 0,
      "finish_reason": "stop",
      "message": {
        "role": "assistant",
        "content": "The current Bitcoin price is £49,074.38 GBP."
      }
    }
  ]
}
```

## Updating Your Agent

To update your agent, simply push changes to your repository:

```bash
# Edit helix.yaml
git add helix.yaml
git commit -m "Update agent configuration"
git push origin main
```

Helix receives the webhook and automatically redeploys your agent with the new configuration.

## Managing Secrets

For API keys and sensitive values, use environment variable syntax in your `helix.yaml`:

```yaml
assistants:
- model: qwen3:8b
  apis:
  - name: My API
    url: https://api.example.com
    headers:
      Authorization: Bearer ${MY_API_KEY}
```

Configure the actual secret values in the Helix UI under **Keys** in your agent settings. Secrets are stored securely and never committed to your repository.
