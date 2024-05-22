---
title: AI Models Helix Uses
description:
weight: 1
aliases:
  - /docs/models
---

## Text Models

We use Model Aliases for different use cases. We update the underlying model to the most performant and efficient model available for that role.

#### Helix 3.5
  * Utilizes [Llama3-8B](https://huggingface.co/meta-llama/Meta-Llama-3-8B-Instruct) for fast and efficient performance, ideal for everyday tasks.

#### Helix 4
  * Powered by [Llama3-70B](https://huggingface.co/meta-llama/Meta-Llama-3-70B-Instruct), this model offers deeper insights and although a bit slower, it's smarter for complex queries.

#### Helix Code
  * Features [CodeLlama-70B](https://huggingface.co/meta-llama/CodeLlama-70b-hf) from Meta, which excels in programming and coding tasks, surpassing the capabilities of GPT-4 in software development contexts.

#### Helix JSON
  * Operates on [Nous Hermes 2 Pro 7B](https://huggingface.co/NousResearch/Hermes-2-Pro-Mistral-7B), specialized for function calling and generating JSON outputs, enhancing automation and integration tasks.

#### Helix Small
  * A smaller model based on [Phi-3 Mini 3.8B](https://huggingface.co/microsoft/Phi-3-mini-128k-instruct), fast and memory efficent.

#### Helix Text Fine Tuning
  * Utilizes [Mistral-7B-Instruct](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1) via [Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl) for [Fine-tuning](/docs/text-finetuning)

Text models use [Ollama](https://ollama.com/) and [axolotl](https://github.com/OpenAccess-AI-Collective/axolotl) for fine-tuning.

See [this](https://github.com/lukemarsden/axolotl/blob/new-long-running/helix-mistral-instruct-v1.yml) for the fine-tuning configuration we use.

## Image Models

* [Stable Diffusion XL](https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0)
  * [Inference](/docs/image-inference)
  * [Fine-tuning](/docs/image-finetuning)

Image models use the excellent [cog](https://github.com/replicate/cog) (in particular [cog-sdxl](https://github.com/replicate/cog-sdxl)).

See [this](https://github.com/helixml/helix/blob/main/cog/helix_cog_wrapper.py) for the settings we use.

## Video Models

Coming soon.

What else would you like to see? Let us know on [Discord](https://discord.gg/VJftd844GE)!