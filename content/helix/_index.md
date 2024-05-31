---
title: Introduction to Helix
linkTitle: Helix Documentation
cascade:
  type: docs
menu:
  main:
    name: Helix Docs
    weight: 2
next: /helix/quickstart
weight: 2
aliases:
  - /docs
  - /docs/overview
---

👋 Hello! Welcome to the <span style="color: #EF2EC6;">Helix</span> documentation!

## What is <span style="color: #EF2EC6;">Helix</span>?

<span style="color: #your-secondary-color;">Helix is a generative AI platform that you can run on our cloud or deploy in your own data center or cloud account.</span> It provides an easy-to-use interface to using open source AI that's accessible to everyone.

{{< youtube "v6XZT8u6khI" >}}

## Key Concepts

Before diving into Helix, it's helpful to understand a few key concepts:

- **Models**: AI models are the core building blocks of Helix. They are pre-trained on vast amounts of data and can be fine-tuned for specific tasks.

- **Fine-tuning**: Fine-tuning is the process of adapting a pre-trained model to a specific task or domain using additional training data. This allows you to customize models for your particular use case.

- **Inference**: Inference is the act of using a trained model to generate predictions or outputs based on new input data. Helix makes it easy to perform inference with fine-tuned models.

For more detailed explanations of these and other key concepts, check out our [Glossary](/docs/glossary).



## How <span style="color: #EF2EC6;">Helix</span> works

Under the hood, it uses the best open source models and includes a GPU scheduler that can fit model instances into GPU memory to optimally trade off user facing latency with GPU memory utilization.

<span style="color: #00D5FF;">Helix's</span> Runner architecture means you can deploy a single control plane and then connect GPUs to it – from your enterprise, a cloud provider or a specialist provider like Runpod or Lambda labs, and they'll all be brought together into an easy to use environment.

It integrates with Keycloak for authentication so can be integrated into any enterprise ActiveDirectory/LDAP/OAuth environment.

## Next steps

- [Getting Started Guide](/docs/getting-started)
- [Try it out online](https://app.tryhelix.ai)