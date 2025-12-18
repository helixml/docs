---
title: Helix Architecture
weight: 3
aliases:
  - /docs/architecture
tags:
- design
- architecture
---

Helix is built on a modular architecture that separates the control plane from compute resources, enabling flexible deployment across different environments.

## High-Level Architecture

![Helix Architecture](helix_architecture.svg)

## Core Components

### Control Plane

The control plane orchestrates all Helix operations:

* **API Server** ([Go](https://github.com/helixml/helix/tree/main/api/pkg))
  - RESTful API for all operations
  - WebSocket connections for real-time updates
  - Job scheduling and queue management
  - Reverse proxy for frontend assets

* **Frontend** ([React/TypeScript](https://github.com/helixml/helix/tree/main/frontend))
  - Chat interface for AI interactions
  - App and session management
  - Desktop streaming viewer (WebSocket-based)

* **Database** (PostgreSQL)
  - Session and conversation storage
  - App configurations
  - User data and access control

* **Authentication**
  - Built-in authentication ("regular" mode)
  - Integration with external OIDC providers for enterprise SSO

### Runners

[Runners](https://github.com/helixml/helix/tree/main/api/pkg/runner) provide GPU compute for inference and fine-tuning:

- Connect to control plane via **outbound WebSocket** (works behind NAT)
- Report available GPU memory and accept matching jobs
- Run model instances via [Ollama](https://ollama.com) or [vLLM](https://github.com/vllm-project/vllm)
- Support multiple concurrent model instances based on GPU memory

### External Agent Sandbox

The sandbox provides isolated environments for AI agents to work autonomously:

#### Wolf Streaming Server

[Wolf](https://github.com/games-on-whales/wolf) handles GPU-accelerated desktop streaming:

- **NVIDIA hardware encoding** (H.264/HEVC/AV1)
- **Moonlight protocol** for low-latency streaming
- **Docker-in-Docker** architecture for container management

#### WebSocket Streaming

Desktop streaming uses WebSocket-only transport for enterprise compatibility:

- Works through **standard HTTPS** (port 443 only)
- No WebRTC/TURN servers required
- **WebCodecs API** for browser-side video decoding
- Binary protocol for video frames and input events

#### Hydra (Multi-Tenant Docker Isolation)

[Hydra](https://github.com/helixml/helix/tree/main/api/pkg/hydra) provides per-session Docker isolation:

- **Per-session dockerd instances** - Each user gets isolated Docker daemon
- **Isolated networks** - Sessions cannot see each other's containers
- **veth bridge injection** - Desktop can reach user's Docker containers
- **Custom DNS resolution** - Container names resolve within sessions
- **Enterprise DNS support** - Internal DNS servers and private TLDs work

#### Desktop Environments

Multiple desktop environments are supported:

| Desktop | Display Server | Use Case |
|---------|---------------|----------|
| **Sway** | Native Wayland | Lightweight, fast |
| **Ubuntu** | X11 via Xwayland | Full GNOME desktop |
| **Zorin** | X11 via Xwayland | User-friendly interface |

Each desktop includes:
- **Zed editor** with AI agent integration
- **Firefox browser** for web development
- **Docker CLI** for container management
- **Git** for version control

## Data Flow

### Chat/Inference Flow

```
Browser → API Server → Job Queue → Runner → Model Instance → Response
                ↑                                    ↓
                └────────────── WebSocket ───────────┘
```

### Desktop Streaming Flow

```
Browser                    API/Proxy              Sandbox
   │                           │                     │
   │  WebSocket connect        │                     │
   ├──────────────────────────►│                     │
   │                           │  RevDial tunnel    │
   │                           │◄───────────────────┤
   │                           │                     │
   │  Video frames (binary)    │                     │
   │◄──────────────────────────│◄────────────────────┤ Wolf encodes
   │                           │                     │
   │  Input events (binary)    │                     │
   ├──────────────────────────►├────────────────────►│ Desktop receives
   │                           │                     │
```

## Enterprise Deployment Considerations

Helix is designed for enterprise environments:

- **L7 Load Balancer Compatible** - All traffic over HTTP/HTTPS
- **Internal DNS Support** - Works with enterprise DNS servers
- **Proxy Support** - Respects `HTTP_PROXY`/`HTTPS_PROXY`
- **Private CA Certificates** - Support for internal TLS certificates
- **Network Segmentation** - Configurable endpoints for different network zones

## Related Resources

- [Docker Compose Configuration](https://github.com/helixml/helix/blob/main/docker-compose.yaml)
- [Helm Charts](https://github.com/helixml/helix/tree/main/charts)
- [Private Deployment Guide](/helix/private-deployment/)
