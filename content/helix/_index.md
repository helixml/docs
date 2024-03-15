---
title: Introduction to Helix
linkTitle: Helix Documentation
cascade:
  type: docs
menu:
  main:
    name: Helix Docs
    weight: 2
next: /helix/getting-started
weight: 2
aliases:
  - /docs
  - /docs/overview
---

👋 Hello! Welcome to the Helix documentation!

## What is Helix?

Helix is a generative AI platform that you can run on our cloud or deploy in your own data center or cloud account.  It provides an easy-to-use interface to using open source AI that's accessible to everyone.

{{< youtube "v6XZT8u6khI" >}}

## How Helix works

Under the hood, it uses the best open source models and includes a GPU scheduler that can fit model instances into GPU memory to optimally trade off user facing latency with GPU memory utilization.

Helix's Runner architecture means you can deploy a single control plane and then connect GPUs to it – from your enterprise, a cloud provider or a specialist provider like Runpod or Lambda labs, and they'll all be brought together into an easy to use environment.

It integrates with Keycloak for authentication so can be integrated into any enterprise ActiveDirectory/LDAP/OAuth environment.

## Next steps

- [Getting Started Guide](/docs/getting-started)
- [Try it out online](https://app.tryhelix.ai)
