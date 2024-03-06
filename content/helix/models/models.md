---
title: AI Models Helix Uses
description:
weight: 1
---

## Text Models

* [Mistral-7B-Instruct](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1)
  * [Inference](/docs/text-inference)
  * [Fine-tuning](/docs/text-finetuning)

Text models use [axolotl](https://github.com/OpenAccess-AI-Collective/axolotl).

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