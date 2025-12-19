---
title: Helix Quick Start
description: Get started with Helix by deploying it on your own infrastructure.
weight: 1
aliases:
  - /docs/getting-started
tags:
- quick-start
- private-deployment
---

Helix is designed for private deployment on your own infrastructure. This guide will help you get started quickly using the Helix installer.

## Prerequisites

Before you begin, ensure you have:

- A Linux machine (Ubuntu 20.04+ recommended)
- **Docker** installed
- Root or sudo access for installation
- (Optional) An **NVIDIA GPU** for running local models

## Quick Start

### 1. Download and Run the Installer

```bash
curl -sL -O https://get.helixml.tech/install.sh
chmod +x install.sh
sudo ./install.sh
```

The installer will guide you through configuration options and set up all required services.

### 2. Access Helix

Once installation completes, Helix will be available at:

- **Frontend:** http://localhost:8080
- **API:** http://localhost:8080/api/v1

### 3. Install the Helix CLI (Optional)

Install the CLI to interact with Helix from the command line:

```bash
sudo ./install.sh --cli
```

Connect the CLI to your Helix instance:

```bash
export HELIX_URL=http://localhost:8080
export HELIX_API_KEY=your-api-key
```

Get your API key from **Account** → **API Keys** in the web UI.

### 4. Connect a GPU Runner (Optional)

If you have an NVIDIA GPU and want to run local models, attach a runner:

1. Log into Helix at http://localhost:8080
2. Go to **Account** → **Runners** to find your runner token
3. Start the runner with your token:

```bash
docker run --gpus all \
  -e RUNNER_TOKEN=your-token-here \
  -e API_HOST=http://your-helix-server:8080 \
  registry.helix.ml/helix/runner:latest
```

Alternatively, use external LLM providers (OpenAI, Anthropic, Together) without a local GPU. Configure these in **Account** → **AI Providers**.

## What You Can Do with Helix

### Chat with AI Models

Once deployed, you can interact with AI models through the web interface or API:

- **Text conversations** with models like Llama, Qwen, or external providers
- **RAG (Retrieval Augmented Generation)** - Upload documents and chat with your data
- **Fine-tuning** - Train models on your own text data

### Build AI-Powered Apps

Create custom AI applications using:

- **Helix Agents** - Define tools, knowledge bases, and system prompts
- **API Integration** - Use the OpenAI-compatible API in your applications

### Coding Agents

Run fleets of background coding agents with real GPU-accelerated desktops:

- **Desktop streaming** - Watch AI agents work in real-time via browser
- **Spec-first development** - Agents write design docs before code
- **Kanban orchestration** - Manage dozens of agents from one view

## Next Steps

- **[Private Deployment Guide](/helix/private-deployment/)** - Detailed deployment options including Kubernetes
- **[Architecture Overview](/helix/getting-started/architecture/)** - Understand how Helix works
- **[Building Apps](/helix/develop/apps/)** - Create custom AI applications
- **[API Reference](/helix/api-reference/)** - Integrate Helix into your workflows

## Getting Help

If you encounter issues:

- Check the [FAQ](/helix/getting-started/faq/)
- Visit our [GitHub Issues](https://github.com/helixml/helix/issues)
- Join the [Discord community](https://discord.gg/VJftd844GE)
