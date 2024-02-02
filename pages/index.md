---
title: Create your own AI using any data
description: From language models to image models and more, Helix brings the best of open source AI to your business in an ergonomic, scalable way, while optimizing the tradeoff between GPU memory and latency.
---

{% section .hero %}

{% typewriter /%}

> Looking for a private GenAI platform? From language models to image models and more, Helix brings the best of open source AI to your business in an ergonomic, scalable way, while optimizing the tradeoff between GPU memory and latency.

[View docs](/docs/getting-started) {% .primary %}

{% /section %}

{% section .try .no-mobile %}

![Dashboard](/dashboard.png)

{% /section %}

{% section .value-props %}

{% table %}

---

- {% ascii "key" /%}

  {% item %}

  ### Open weights {% .jumbo %}

  Maintain full control over your data and models derived from it. Because we use open source models, you can own the weights, stay in control, and simplify data governance. Remove vendor lock-in and improve latency and security.
  {% /item %}

- {% ascii "pencil" /%}

  {% item %}

  ### Human friendly {% .jumbo %}

  The natural chat interface to data prep and fine tuning workflows allows you to fine tune highly performant, optimized and small models that excel at specific tasks. This makes training your own AI accessible to everyone.

  {% /item %}

- {% ascii "card" /%}

  {% item %}

  ### Developer &amp; DevOps friendly {% .jumbo %}

  Helix is simple to integrate with: we have a [simple API](/docs/api) and you can also see what API calls to make from inside the [chat app](https://app.tryhelix.ai/). Deploying the stack is easy with our optimized containers, deploy GPU runners with NVIDIA Docker or RunPod.

  {% /item %}

{% /table %}

{% /section %}

{% section .get-started %}

{% side-by-side %}

{% item %}

## Get started quickly {% .jumbo %}

Try our hosted [Helix Cloud](https://app.tryhelix.ai) today to see what it can do, then come back here to learn how to deploy it yourself.

[Deploy the control plane](/docs/controlplane/) and then attach runners for a fully private deployment on any infrastructure.

[Docs](/docs/) {% .primary %}

{% /item %}

## Easy to use API

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

[Full API reference](/docs/api)