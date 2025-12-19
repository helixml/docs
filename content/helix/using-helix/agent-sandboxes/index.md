---
title: Helix Agent Sandboxes
linkTitle: Agent Sandboxes
description: GPU-accelerated desktop environments for AI coding agents.
weight: 5
tags:
- agents
- sandboxes
- gpu
---

{{< tip >}}
Helix Agent Sandboxes are currently in private beta. Join our [Discord](https://discord.gg/VJftd844GE) to request access.
{{< /tip >}}

Helix Agent Sandboxes provide dedicated, GPU-accelerated desktop environments for AI coding agents. Instead of running agents on your local machine, they operate as long-running server processes with their own isolated Linux desktop, IDE, and GPU-accelerated rendering at 120fps.

![Coding agent working in a GPU-accelerated desktop environment with Zed IDE](coding-agent.jpg)

See also the [Coding Agents overview](/helix/#coding-agents) for how sandboxes fit into the broader agent workflow.

## How It Works

Each agent receives its own containerized environment with:

- **Isolated Linux desktop** running on Wayland (minimal GPU memory footprint)
- **Zed IDE** - a Rust-based editor with native GPU rendering
- **AI agent** - Claude Code, Gemini CLI, Qwen Code, or other compatible agents
- **GPU streaming** - using the Moonlight protocol (the same technology used for cloud gaming)

The Helix control plane manages orchestration, knowledge sources, and conversation history through the UI.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Helix Control Plane                      │
│         (Orchestration, Knowledge, History)                 │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Agent Sandbox  │ │  Agent Sandbox  │ │  Agent Sandbox  │
│  ┌───────────┐  │ │  ┌───────────┐  │ │  ┌───────────┐  │
│  │  Zed IDE  │  │ │  │  Zed IDE  │  │ │  │  Zed IDE  │  │
│  │  + Agent  │  │ │  │  + Agent  │  │ │  │  + Agent  │  │
│  └───────────┘  │ │  └───────────┘  │ │  └───────────┘  │
│   Wayland/GPU   │ │   Wayland/GPU   │ │   Wayland/GPU   │
└─────────────────┘ └─────────────────┘ └─────────────────┘
         │                   │                   │
         └───────────────────┼───────────────────┘
                             ▼
                   Moonlight Streaming
                     (120fps to browser)
```

## Features

### Multi-Agent Support

Run multiple AI agents concurrently through the standardized Agent Communication Protocol (ACP):

- Claude Code
- Gemini CLI
- Qwen Code
- Other compatible agents

### Contextual Awareness

Integrate external knowledge sources into agent environments:

- PDFs and documents
- Jira and Confluence
- MCP (Model Context Protocol) servers
- Custom knowledge bases

### Knowledge Aggregation

Conversation histories across all coding sessions are searchable via RAG, enabling knowledge sharing across your team.

### Spec-Driven Workflows

Use Kanban boards to manage agent task specifications before implementation, ensuring agents work on well-defined tasks.

## Installation

### Requirements

- Linux x86_64 (Ubuntu 22.04+ recommended)
- NVIDIA, AMD, or Intel GPU with drivers installed
- Docker

{{< warn >}}
macOS is not currently supported for running sandboxes.
{{< /warn >}}

### Single Node Setup

For development or small deployments, run everything on one machine:

```bash
curl -sL -O https://get.helix.ml/install.sh && bash install.sh
```

This installs:
- Helix CLI
- Control plane API
- Agent sandbox components

### Multi-Node Setup

For production deployments, separate the control plane from sandbox nodes:

**1. Control Plane (no GPU required)**

```bash
curl -sL -O https://get.helix.ml/install.sh && bash install.sh --controlplane
```

**2. Sandbox Node (GPU required)**

Get your runner token from the control plane configuration, then:

```bash
curl -sL -O https://get.helix.ml/install.sh && bash install.sh --sandbox --token YOUR_RUNNER_TOKEN
```

### Configure Inference Providers

After installation, configure external inference providers through the Admin Panel:

- Anthropic (Claude)
- OpenAI
- Any OpenAI-compatible API

## Use Cases

### Ambient Computing

Agents work asynchronously on tasks while you focus on other work. Review results when ready rather than waiting for completions.

### Fleet Management

Manage multiple concurrent agent tasks across your team. Track progress, review outputs, and coordinate work through the Helix UI.

### Cloud Development Environments

Persistent, GPU-accelerated development environments that survive disconnections. Pick up where you left off from any device.

### Security

Each agent runs in its own isolated container with a separate filesystem, preventing agents from accessing your local machine or interfering with each other. Code execution happens in throwaway VMs, so even if an agent is convinced to run malicious commands, the blast radius is contained.

## Getting Started

1. Install Helix with sandbox support
2. Access the Helix UI at your deployment URL
3. Create a new agent sandbox from the dashboard
4. Connect your preferred AI agent
5. Start coding with your GPU-accelerated agent
