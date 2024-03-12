---
title: Helix Docs
toc: false
description: Helix is a private GenAI platform that helps bring on-premise LLMs, StableDiffusion, and more to your business.
---

{{< index/hero title="Helix is Open AI in a box. Your box. Use chat or API. Deploy anywhere." subtitle="Looking for a private GenAI platform? From language models to image models and more, Helix brings the best of open source AI to your business in an ergonomic, scalable way, while optimizing the tradeoff between GPU memory and latency." link="/helix/_index.md" image="dashboard.png" >}}

{{< index/features >}}
{{% index/feature-card title="Open weights" icon="cube" %}}
Maintain full control over your data and models derived from it. Because we use open source models, you can own the weights, stay in control, and simplify data governance. Remove vendor lock-in and improve latency and security.
{{% /index/feature-card %}}
{{% index/feature-card title="Human friendly" icon="user-circle" %}}
The natural chat interface to data prep and fine tuning workflows allows you to fine tune highly performant, optimized and small models that excel at specific tasks. This makes training your own AI accessible to everyone.
{{% /index/feature-card %}}
{{% index/feature-card title="Developer & DevOps friendly" %}}
Helix is simple to integrate with: we have a simple API and you can also see what API calls to make from inside the chat app. Deploying the stack is easy with our optimized containers, deploy GPU runners with NVIDIA Docker or RunPod.
{{% /index/feature-card %}}
{{< /index/features >}}


{{< index/cta >}}
{{% index/cta-left title="Get started quickly" %}}
Try our hosted [Helix Cloud](https://app.tryhelix.ai) today to see what it can do, then come back here to learn how to deploy it yourself.

[Deploy the control plane]({{< ref "/helix/private-deployment/controlplane.md" >}}) and then attach runners for a fully private deployment on any infrastructure.

[Docs ⇨]({{< ref "/helix/_index.md" >}})
{{% /index/cta-left %}}
{{% index/cta-right title="Easy to use API" %}}
Create a new chat session:

```shell
curl https://app.tryhelix.ai/api/v1/sessions \
  -H 'Authorization: Bearer <YOUR_API_KEY>'
  -d "input=yo&mode=inference&type=text"
```

Generate an image:

```shell
curl https://app.tryhelix.ai/api/v1/sessions \
  -H 'Authorization: Bearer <YOUR_API_KEY>'
  -d "input=flying fish&mode=inference&type=image"
```

Get your API key from [Account](https://app.tryhelix.ai/account) page in the app.

[Full API reference]({{< ref "/helix/api.md" >}})
{{% /index/cta-right %}}
{{< /index/cta >}}
