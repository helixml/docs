---
title: Glossary
description: A glossary of terms related to Helix
weight: 10
aliases:
  - /docs/glossary
---

## Models

- **Helix 3.5**: Uses Llama3-8B for fast performance on everyday tasks.
- **Helix 4**: Powered by Llama3 70B for smarter but slower responses to complex queries.
- **Helix Mixtral**: Uses Mistral 8x7B MoE, relied on for certain use cases.
- **Helix JSON**: Based on Nous-Hermes 2 Theta for function calling & JSON output.
- **Helix Small**: Uses Phi-3 Mini 3.8B for fast, memory-efficient performance.
- **Stable Diffusion XL**: Used for high-quality image generation with a small GPU memory footprint.

## Capabilities

- **Text Inference**: Generating text responses based on prompts using large language models.
- **Text Fine-Tuning**: Adapting language models on custom data to improve performance on specific tasks.
- **Image Inference**: Generating images from text prompts using Stable Diffusion XL.
- **Image Fine-Tuning**: Adapting Stable Diffusion XL on custom images to generate novel images in a similar style.

## Architecture

- **Control Plane**: Manages the Helix web app, API, database, and authentication. Built with React, Go, Keycloak, Postgres.
- **Runners**: Connect to Control Plane to provide GPUs for running model instances. Package models in "fat" containers.
- **Ollama**: Used for text model inference.
- **Axolotl**: Used for text model fine-tuning.
- **Cog**: Used for packaging and running Stable Diffusion XL for image tasks.

## Deployment Options
- **Docker Compose**: Deploy Helix control plane and runners using Docker Compose.
- **Kubernetes with Helm**: Deploy Helix control plane and runners on Kubernetes using Helm charts.
- **Runpod**: Deploy Helix runners on Runpod GPU instances.
- **LambdaLabs**: Deploy Helix runners on LambdaLabs GPU instances.

## Control Plane Components
- **Keycloak**: Provides authentication for the Helix control plane. Can be deployed separately or as part of the Helix Helm chart.
- **API Server**: Manages communication between the web app, database, and runners. Written in Go.
- **Web App**: The React frontend for interacting with Helix.
- **Postgres**: The database used by the Helix control plane.

## Runner Components
- **Runner Service**: Connects to the control plane to receive jobs and manage model instances. Written in Go.
- **Model Instances**: Python processes that load and run the actual ML models using Cog or Axolotl.

## Configuration
- **Environment Variables**: Used to configure the Helix control plane and runners. Key variables include database passwords, runner tokens, external service integrations.
- **Helm Values**: When deploying on Kubernetes, Helm chart values are used to configure the control plane and runners, mapping to the underlying environment variables.

## Integrations
- **Github OAuth**: Allows users to connect their Github repos to enable Helix Apps functionality.
- **Together API**: Used for generating question-answer pairs for fine-tuning.
- **Monitoring**: Helix can integrate with Sentry for error tracking and Google Analytics for usage analytics.
