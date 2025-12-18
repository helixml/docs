---
title: Frequently asked questions
weight: 2
aliases:
  - /docs/faq
tags:
- help
---

## What is Helix?

Helix is an open-source AI platform that lets you run powerful language models on your own infrastructure. Think of it as having your own private ChatGPT that you control completely.

## What makes Helix different?

We allow you to safely bring LLMs into your business by running models in your environment. This means you have zero data leakage risk and can develop your own fine-tuned LLM that remains your core IP.

## Do I need to be technical to use Helix?

**To use Helix:** No! Once deployed, Helix provides a familiar chat interface similar to ChatGPT. You can have conversations, ask questions, and even upload documents to chat with your own data.

**To deploy Helix:** You'll need someone with basic Linux and Docker knowledge. Our installer script handles most of the complexity.

## How hard is it to get started?

See [getting started](/helix/getting-started/_index.md)! Installation typically takes 15-30 minutes with our automated installer.

## Do I need a GPU?

**No, a GPU is optional.** You can use Helix in two ways:

1. **Without a GPU:** Connect to external AI providers (OpenAI, Anthropic, Together) and route your queries through Helix for logging, access control, and app building.

2. **With a GPU:** Run open-source models locally for complete data privacy. NVIDIA GPUs with 24GB+ VRAM are recommended.

## My data is private, how can I train models on it securely without the data leaving my company's infrastructure?

This is where Helix really shines. Because the models are open source, you are free to fine-tune them on your own infrastructure. Try it out to get a feel for what it's capable of, and then check out our [deployment guide](/helix/private-deployment/_index.md). Feel free to [contact us](mailto:founders@helixml.tech) with questions.

## What open source models can I use with Helix?

Almost any popular model will work with Helix: versions of Llama, Deepseek, Phi, Qwen, Aya, and more. For image generation, Flux is supported.

## Can I integrate my models with my own apps or business apps?

Yes, we expose industry-standard OpenAI compatible APIs. Please see the [API documentation](/helix/api-reference/_index.md).

We also provide "App" primitives to make it even easier for you to [create AI-powered applications](/helix/develop/_index.md).

## What is RAG (Retrieval Augmented Generation)?

RAG lets you "chat with your documents." Upload PDFs, Word docs, or other files, and the AI will answer questions based on their content. This is useful for creating chatbots that know about your company's specific information.

## How much does Helix cost?

Helix is open source and free to self-host. Your main costs will be:

- **Compute:** Server or cloud instance costs
- **GPU (optional):** If running local models, GPU rental or hardware
- **AI API costs (optional):** If using external providers like OpenAI

## Is my data safe with Helix?

When self-hosted, your data never leaves your infrastructure. Conversations, uploaded documents, and fine-tuned models all stay on your servers. This is ideal for sensitive business data or compliance requirements.

## What are Helix Apps?

Helix Apps let you create custom AI assistants. You can:

- Define a system prompt (personality/instructions)
- Connect knowledge bases (documents the AI can reference)
- Add tools (let the AI take actions like searching the web or calling APIs)

No coding required for basic apps!

## Can I run Helix on Kubernetes?

Yes! We provide Helm charts for Kubernetes deployments. See the [private deployment guide](/helix/private-deployment/_index.md) for details.

## How do I get help?

- Check this FAQ and our [documentation](/helix/)
- Visit our [GitHub Issues](https://github.com/helixml/helix/issues)
- Join the [Discord community](https://discord.gg/VJftd844GE)
- Email us at [founders@helixml.tech](mailto:founders@helixml.tech)
