---
title: Environment Variables
description: Learn about the environment variables used to configure Helix.
weight: 6
tags:
- config
---

Configure Helix using environment variables in your `.env` file (Docker Compose) or Helm values (Kubernetes).

## Control Plane Variables

Core configuration from [`.env.example-prod`](https://github.com/helixml/helix/blob/main/.env.example-prod):

| Variable | Description |
|----------|-------------|
| `SERVER_URL` | URL where the Helix server is hosted |
| `POSTGRES_ADMIN_PASSWORD` | Admin password for the Postgres database |
| `RUNNER_TOKEN` | Authentication token for Helix runners |
| `TOGETHER_API_KEY` | API key for Together.ai (used for QA pair generation) |

### Optional Integrations

| Variable | Description |
|----------|-------------|
| `GOOGLE_ANALYTICS_FRONTEND` | Google Analytics ID |
| `SENTRY_DSN_FRONTEND` | Sentry DSN for frontend monitoring |
| `SENTRY_DSN_API` | Sentry DSN for API monitoring |
| `EMAIL_SMTP_HOST` | SMTP server hostname |
| `EMAIL_SMTP_PORT` | SMTP server port |
| `EMAIL_SMTP_USERNAME` | SMTP username |
| `EMAIL_SMTP_PASSWORD` | SMTP password |
| `EMAIL_MAILGUN_DOMAIN` | Mailgun domain for email notifications |
| `EMAIL_MAILGUN_API_KEY` | Mailgun API key |

## Runner Variables

Key configuration from [`runner_config.go`](https://github.com/helixml/helix/blob/main/api/pkg/config/runner_config.go):

| Variable | Description | Default |
|----------|-------------|---------|
| `RUNTIME_OLLAMA_ENABLED` | Enable LLM inference with Ollama | `true` |
| `RUNTIME_OLLAMA_WARMUP_MODELS` | Models to pre-download (comma-separated) | - |
| `RUNTIME_AXOLOTL_ENABLED` | Enable fine-tuning for Mistral-7B and SDXL | `true` |
| `RUNTIME_AXOLOTL_WARMUP_MODELS` | Fine-tuning models to pre-warm | - |
| `HF_TOKEN` | HuggingFace token for model access | - |

Example warmup models:

```bash
RUNTIME_OLLAMA_WARMUP_MODELS=llama3:instruct,mixtral:instruct
RUNTIME_AXOLOTL_WARMUP_MODELS=mistralai/Mistral-7B-Instruct-v0.1,stabilityai/stable-diffusion-xl-base-1.0
```

### HuggingFace Token

For text fine-tuning with Mistral-7B:

1. Accept the license at [Mistral-7B-Instruct](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1)
2. Get an access token from [HuggingFace settings](https://huggingface.co/settings/tokens)
3. Set `HF_TOKEN` in your environment

## Kubernetes Notes

When using Helm, values like `runner.models` map to `RUNTIME_OLLAMA_WARMUP_MODELS`.

## Full Reference

- Control Plane: [`config.go`](https://github.com/helixml/helix/blob/main/api/pkg/config/config.go)
- Runner: [`runner_config.go`](https://github.com/helixml/helix/blob/main/api/pkg/config/runner_config.go)
