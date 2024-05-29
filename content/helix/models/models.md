---
title: AI Models Helix Uses
description:
weight: 1
aliases:
  - /docs/models
---

## Text Models

We use Model aliases for different use cases. We update the underlying model to the most performant and efficient model available for that role.

You can specify the 

#### Helix 3.5
  * Utilizes [Llama3-8B](https://ollama.com/library/llama3) for fast and efficient performance, ideal for everyday tasks.
  * Ollama tag `llama3:instruct`

#### Helix 4
  * Powered by [Llama3-70B](https://ollama.com/library/llama3:70b), this model offers deeper insights and although a bit slower, it's smarter for complex queries.
  * Ollama tag `llama3:70b`

#### Helix Mixtral
  * Features [CodeLlama-70B](https://ollama.com/library/mixtral) from Meta, which excels in programming and coding tasks, surpassing the capabilities of GPT-4 in software development contexts.
  * Ollama tag `mixtral:instruct`

#### Helix JSON
  * Operates on [Nous Hermes 2 Theta Llama3 7B](https://ollama.com/adrienbrault/nous-hermes2theta-llama3-8b:q8_0), specialized for function calling and generating JSON outputs, enhancing automation and integration tasks.
  * Ollama tag `adrienbrault/nous-hermes2theta-llama3-8b:q8_0`

#### Helix Small
  * A smaller model based on [Phi-3 Mini 3.8B](https://ollama.com/library/phi3), fast and memory efficent.
  * Ollama tag `phi3:instruct`

#### Helix Text Fine Tuning
  * Utilizes [Mistral-7B-Instruct](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1) via [Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl) for [Fine-tuning](/docs/text-finetuning)
<br>

Text models use [Ollama](https://ollama.com/) for inference and [axolotl](https://github.com/OpenAccess-AI-Collective/axolotl) for fine-tuning (and inference on a fine-tune).

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
