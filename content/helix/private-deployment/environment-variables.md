---
title: Helix Environment Variables
description: Learn about the environment variables used to configure Helix.
weight: 6
---

When deploying Helix with Docker Compose, you can configure various settings using environment variables defined in the `.env` file. This page describes the key environment variables used to configure the Helix control plane and runner.

## Control Plane Environment Variables

The main environment variables for configuring the Helix control plane can be found in the [`.env.example-prod`](https://github.com/helixml/helix/blob/main/.env.example-prod) file:

- `KEYCLOAK_ADMIN_PASSWORD`: Set the admin password for Keycloak authentication
- `POSTGRES_ADMIN_PASSWORD`: Set the admin password for the Postgres database  
- `RUNNER_TOKEN`: Set an authentication token for the Helix runner
- `KEYCLOAK_FRONTEND_URL`: Set the URL where Keycloak authentication is hosted, e.g. `http://yourdomain.com/auth/`
- `SERVER_URL`: Set the URL where the Helix server is hosted
- `TOGETHER_API_KEY`: Set the API key for Together.ai, currently needed for QA pair generation

### Additional optional integrations

- `GOOGLE_ANALYTICS_FRONTEND`: Google Analytics ID
- `SENTRY_DSN_FRONTEND` / `SENTRY_DSN_API`: Sentry DSNs for frontend and API monitoring
- `EMAIL_SMTP_HOST` / `EMAIL_SMTP_PORT` / `EMAIL_SMTP_USERNAME` / `EMAIL_SMTP_PASSWORD`: SMTP config for sending email notifications 
- `EMAIL_MAILGUN_DOMAIN` / `EMAIL_MAILGUN_API_KEY`: Mailgun config for sending email notifications
- `SUBSCRIPTION_QUOTAS_FINETUNING_FREE_MAX_CHUNKS`: Set the maximum number of fine-tuning chunks for free users

## Runner Environment Variables

Key environment variables for the Helix runner are defined in [`runner_config.go`](https://github.com/helixml/helix/blob/main/runner/runner_config.go):

- `RUNTIME_AXOLOTL_ENABLED`: Enable/disable fine-tuning and inference for Mistral-7B and SDXL models (default `true`)
- `RUNTIME_AXOLOTL_WARMUP_MODELS`: Comma-separated list of Mistral-7B and SDXL models to pre-warm, e.g. `mistral-ai/mistral-7b-instruct,mistral-ai/sdxl-7b-instruct`
- `RUNTIME_OLLAMA_ENABLED`: Enable/disable LLM inference with Ollama backend (default `true`) 
- `RUNTIME_OLLAMA_WARMUP_MODELS`: Comma-separated list of LLM models to enable and pre-download for inference, e.g. `llama3:instruct,llama3:chat`

### Important notes

- The LLM models specified in `RUNTIME_OLLAMA_WARMUP_MODELS` must be included in the Helix Docker image you are using. See the [models documentation](https://docs.helix.ml/helix/models) for available models.
- If using Helix on Kubernetes, the Helm chart values like `runner.models` map to the `RUNTIME_OLLAMA_WARMUP_MODELS` env var.

The full list of available environment variables can be found in [`config.go`](https://github.com/helixml/helix/blob/main/config.go) and [`runner_config.go`](https://github.com/helixml/helix/blob/main/runner/runner_config.go).
