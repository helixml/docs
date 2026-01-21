---
title: Network Requirements
weight: 10
tags:
- install
- network
- firewall
---

Minimum network requirements for Helix in air-gapped or restricted environments.

<!--more-->

Helix consists of two main components: the **Helix Control Plane** (API server, session management, LLM routing) and **Helix Code Sandboxes** (isolated containers running user sessions). Helix Code Sandboxes initiate outbound WebSocket connections to the control plane—they never accept inbound connections. Communication flows through two WebSocket channels: a RevDial tunnel for control operations (screenshots, input, clipboard) and an agent sync channel for chat messages and LLM responses. Both components need access to the Helix registry for container images.

## Control Plane Network Requirements

| Phase | Hostname | Port | Purpose |
|-------|----------|------|---------|
| Install | `registry.helixml.tech` | 443 | Container image registry |
| Install | `get.helixml.tech` | 443 | Install script and version info |
| Install | `helix-registry-europe.s3.eu-west-2.amazonaws.com` | 443 | Container image blob storage (AWS S3) |
| Runtime | `api.openai.com` | 443 | OpenAI (if configured) |
| Runtime | `api.anthropic.com` | 443 | Anthropic (if configured) |
| Runtime | `api.together.xyz` | 443 | Together AI (if configured) |

## Helix Code Sandbox Network Requirements

| Phase | Hostname | Port | Purpose |
|-------|----------|------|---------|
| Install | `registry.helixml.tech` | 443 | Container image registry |
| Install | `get.helixml.tech` | 443 | Install script and version info |
| Install | `helix-registry-europe.s3.eu-west-2.amazonaws.com` | 443 | Container image blob storage (AWS S3) |
| Runtime | Your control plane (e.g., `app.helix.ml`) | 443/8080 | WebSocket (RevDial tunnel + agent sync) |

The Sandbox establishes two outbound WebSocket connections to the control plane:
- **RevDial tunnel** (`/api/v1/revdial`) - control channel for screenshots, input, clipboard
- **Agent sync** (`/api/v1/external-agents/sync`) - chat messages and LLM responses


## Optional: Desktop Image Dependencies on Helix Code Sandboxes

If the agent installs system packages, allow access to:

| Hostname | Purpose |
|----------|---------|
| `archive.ubuntu.com` | Ubuntu packages |
| `security.ubuntu.com` | Security updates |
| `download.docker.com` | Docker repository |

## Optional: Package Managers

For development tasks requiring package installation:

| Language | Endpoints |
|----------|-----------|
| Node.js/npm | `registry.npmjs.org`, `nodejs.org` |
| Python/pip | `pypi.org`, `files.pythonhosted.org` |
| Go | `proxy.golang.org`, `sum.golang.org` |

## Optional: Git Providers

| Provider | Endpoints |
|----------|-----------|
| GitHub | `github.com`, `api.github.com`, `objects.githubusercontent.com` |
| GitLab | `gitlab.com`, `registry.gitlab.com` |
