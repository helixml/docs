---
title: Text Fine Tuning Guidance
description:
weight: 3
---

Helix uses the [Mistral](https://mistral.ai/) series of large language models to provide high quality responses with relatively small memory GPU footprint, including fine-tuning teach the model new information or styles of reasoning and presenting information.

## Data Best Practices

* Your data must answer the question
* More data is better
* Only include data that is relevant to your problem

## Use Case Best Practices

### Question Answering

* Format training data as question-answer pairs
* Ensure your training data includes questions similar to downstream tasks
* Ensure question answer pairs have good "coverage" of your problem domain

## Inference Best Practices

* Imagine yourself performing the task or answering the question
* If you need to ask questions, then you haven't provided enough context
* If you are asking questions about a thing, indicate what the thing is

## Reach out!

Please suggest improvements to this doc or encourage us to write more on this on [Discord](https://discord.gg/VJftd844GE)!
