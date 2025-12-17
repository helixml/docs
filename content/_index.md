---
title: Helix Docs
toc: false
description: Helix is an enterprise-grade platform for coding agents and AI assistants. Run fleets of background coding agents on real GPU-accelerated desktops with RAG, API integration, and multi-provider LLM support.
---

{{< index/hero title="Deploy AI Agents on Your Own Infrastructure" subtitle="HelixML is an enterprise-grade platform for coding agents and AI assistants. Run fleets of background coding agents on real GPU-accelerated desktops. Built-in RAG, API integration, MCP servers, and multi-provider LLM support. Complete data security and control." ref="/helix/_index.md" image="dashboard.png" >}}

{{< index/features >}}
{{% index/feature-card title="Coding Agents" icon="cube" %}}
Run fleets of background coding agents on real GPU-accelerated Linux desktops. Spec-first development with design review before implementation. Kanban board to orchestrate dozens of agents. Stream desktops, pair program, and intervene when needed.
{{% /index/feature-card %}}
{{% index/feature-card title="Knowledge & RAG" icon="user-circle" %}}
Built-in document ingestion (PDFs, Word, text files), web scraping, and multiple RAG backends: Typesense, Haystack, PGVector, LlamaIndex. Upload corporate documents or point at website URLs to create instant customer support agents.
{{% /index/feature-card %}}
{{% index/feature-card title="Multi-Provider LLMs" %}}
Support for OpenAI, Anthropic Claude, and local open-weight models. Our GPU scheduler efficiently packs models into available memory and dynamically loads/unloads based on demand. Full tracing and observability for all LLM interactions.
{{% /index/feature-card %}}
{{< /index/features >}}


{{< index/cta >}}
{{% index/cta-left title="Get started quickly" %}}
Install with our quickstart script:

```bash
curl -sL -O https://get.helixml.tech/install.sh
chmod +x install.sh
sudo ./install.sh
```

Then attach GPU runners or use any OpenAI-compatible LLM. For Kubernetes, see the [private deployment docs]({{< ref "/helix/private-deployment/controlplane" >}}).

[Docs ⇨]({{< ref "/helix/_index.md" >}})
{{% /index/cta-left %}}
{{% index/cta-right title="OpenAI-Compatible API" %}}
Helix exposes an OpenAI-compatible chat completions API:

```shell
curl https://your-helix-server/v1/chat/completions \
  -H 'Authorization: Bearer <YOUR_API_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "llama3:instruct",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```
Get your API key from the Account page in the app.

Try our hosted [Helix Cloud](https://app.tryhelix.ai) today to see what it can do, then come back here to learn how to deploy it yourself.

[Full API reference]({{< ref "/helix/api-reference/_index.md" >}})
{{% /index/cta-right %}}
{{< /index/cta >}}
