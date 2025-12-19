---
title: Environment Variables
description: Reference for Helix environment variables.
weight: 6
tags:
- config
---

Configure Helix using environment variables in your `.env` file (Docker Compose) or Helm values (Kubernetes).

## Core Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `SERVER_URL` | Public URL where the Helix server is hosted | - |
| `LICENSE_KEY` | License key from [deploy.helix.ml](https://deploy.helix.ml/licenses) | - |
| `RUNNER_TOKEN` | Authentication token for Helix runners | - |

## AI Providers

Helix supports multiple AI providers. Configure one or more based on your deployment needs.

### Inference Provider

| Variable | Description | Default |
|----------|-------------|---------|
| `INFERENCE_PROVIDER` | Primary provider: `helix`, `openai`, or `togetherai` | `helix` |

### OpenAI

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | - |
| `OPENAI_BASE_URL` | OpenAI API base URL | `https://api.openai.com/v1` |
| `OPENAI_MODELS` | Comma-separated list of allowed models | - |

### Together AI

| Variable | Description | Default |
|----------|-------------|---------|
| `TOGETHER_API_KEY` | Together AI API key | - |
| `TOGETHER_BASE_URL` | Together AI API base URL | `https://api.together.xyz/v1` |
| `TOGETHER_MODELS` | Comma-separated list of allowed models | - |

### Anthropic

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Anthropic API key | - |
| `ANTHROPIC_BASE_URL` | Anthropic API base URL | `https://api.anthropic.com/v1` |
| `ANTHROPIC_MODELS` | Comma-separated list of allowed models | - |

### vLLM

| Variable | Description | Default |
|----------|-------------|---------|
| `VLLM_API_KEY` | vLLM API key | - |
| `VLLM_BASE_URL` | vLLM API base URL | - |
| `VLLM_MODELS` | Comma-separated list of allowed models | - |

### Dynamic Providers

| Variable | Description | Default |
|----------|-------------|---------|
| `DYNAMIC_PROVIDERS` | Additional providers in format `provider1:api_key1:base_url1,provider2:api_key2:base_url2` | - |
| `ENABLE_CUSTOM_USER_PROVIDERS` | Allow users to configure their own providers | `false` |
| `PROVIDERS_MANAGEMENT_ENABLED` | Allow users to add their own API keys | `false` |

## Authentication

| Variable | Description | Default |
|----------|-------------|---------|
| `AUTH_PROVIDER` | Auth provider: `regular` (built-in) or `oidc` | `regular` |
| `AUTH_REGISTRATION_ENABLED` | Allow new user registration | `true` |
| `ADMIN_USER_IDS` | Comma-separated list of admin user IDs, or `all` | - |

### Built-in Authentication

| Variable | Description | Default |
|----------|-------------|---------|
| `REGULAR_AUTH_ENABLED` | Enable built-in authentication | `true` |
| `REGULAR_AUTH_TOKEN_VALIDITY` | Token validity duration | `168h` (7 days) |
| `REGULAR_AUTH_JWT_SECRET` | JWT signing secret | - |

### OIDC Authentication

| Variable | Description | Default |
|----------|-------------|---------|
| `OIDC_ENABLED` | Enable OIDC authentication | `false` |
| `OIDC_URL` | OIDC provider URL | - |
| `OIDC_CLIENT_ID` | OIDC client ID | `api` |
| `OIDC_CLIENT_SECRET` | OIDC client secret | - |
| `OIDC_AUDIENCE` | Expected JWT audience claim | - |
| `OIDC_SCOPES` | Requested OIDC scopes | `openid,profile,email` |
| `OIDC_SECURE_COOKIES` | Force secure cookies | `false` |

## Database

### PostgreSQL

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_HOST` | PostgreSQL host | `postgres` |
| `POSTGRES_PORT` | PostgreSQL port | `5432` |
| `POSTGRES_DATABASE` | Database name | `helix` |
| `POSTGRES_USER` | Database user | `helix` |
| `POSTGRES_PASSWORD` | Database password | - |

### PGVector (for RAG)

| Variable | Description | Default |
|----------|-------------|---------|
| `PGVECTOR_HOST` | PGVector host | `pgvector` |
| `PGVECTOR_PORT` | PGVector port | `5432` |
| `PGVECTOR_DATABASE` | Database name | `postgres` |
| `PGVECTOR_USER` | Database user | `postgres` |
| `PGVECTOR_PASSWORD` | Database password | - |

## Tools & Agents

| Variable | Description | Default |
|----------|-------------|---------|
| `TOOLS_ENABLED` | Enable agent tools | `true` |
| `TOOLS_MODEL` | Model for tool execution | `llama3:instruct` |
| `TOOLS_TLS_SKIP_VERIFY` | Skip TLS verification for tool requests | `false` |

## Helix Scheduler

| Variable | Description | Default |
|----------|-------------|---------|
| `HELIX_MODEL_TTL` | How long to keep models warm | `10s` |
| `HELIX_SLOT_TTL` | Time before slots are considered dead | `600s` |
| `HELIX_RUNNER_TTL` | Time before runners are considered dead | `30s` |
| `HELIX_SCHEDULING_STRATEGY` | Scheduling strategy: `max_spread` or `bin_pack` | `max_spread` |
| `HELIX_QUEUE_SIZE` | Workload queue buffer size | `100` |

## Notifications

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_URL` | Public app URL for notification links | `https://app.helix.ml` |
| `EMAIL_SMTP_HOST` | SMTP server hostname | - |
| `EMAIL_SMTP_PORT` | SMTP server port | - |
| `EMAIL_SMTP_USERNAME` | SMTP username | - |
| `EMAIL_SMTP_PASSWORD` | SMTP password | - |
| `EMAIL_MAILGUN_DOMAIN` | Mailgun domain | - |
| `EMAIL_MAILGUN_API_KEY` | Mailgun API key | - |

## Monitoring

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_ANALYTICS_FRONTEND` | Google Analytics ID | - |
| `SENTRY_DSN_FRONTEND` | Sentry DSN for frontend | - |
| `SENTRY_DSN_API` | Sentry DSN for API | - |
| `DISABLE_LLM_CALL_LOGGING` | Disable LLM call logging | `false` |
| `DISABLE_USAGE_LOGGING` | Disable usage logging | `false` |

## Runner Configuration

Configure runners using these environment variables (see [`runner_config.go`](https://github.com/helixml/helix/blob/main/api/pkg/config/runner_config.go)):

| Variable | Description | Default |
|----------|-------------|---------|
| `RUNTIME_OLLAMA_ENABLED` | Enable Ollama LLM inference | `true` |
| `RUNTIME_OLLAMA_WARMUP_MODELS` | Models to pre-download (comma-separated) | - |
| `RUNTIME_AXOLOTL_ENABLED` | Enable fine-tuning runtime | `true` |
| `RUNTIME_AXOLOTL_WARMUP_MODELS` | Fine-tuning models to pre-warm | - |
| `HF_TOKEN` | HuggingFace token for model access | - |

Example warmup models:

```bash
RUNTIME_OLLAMA_WARMUP_MODELS=llama3:instruct,qwen3:8b,mixtral:instruct
```

## Full Reference

- Control Plane: [`config.go`](https://github.com/helixml/helix/blob/main/api/pkg/config/config.go)
- Runner: [`runner_config.go`](https://github.com/helixml/helix/blob/main/api/pkg/config/runner_config.go)
