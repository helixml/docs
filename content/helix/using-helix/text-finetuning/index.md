---
draft: true
title: Text Fine-Tuning
description:
weight: 3
aliases:
  - /docs/text-finetuning
  - /docs/text-fine-tune-guidance
  - /helix/guidance/text-fine-tune-guidance/
  - /helix/models/finetuning/
---
draft: true

Helix uses [Mistral-7B-Instruct](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1) via [Axolotl](https://github.com/OpenAccess-AI-Collective/axolotl) for text fine tuning.

## How to Fine-Tune a Language Model on a Document

1. Click "New Session", "Learn", click on the settings, and click "Finetune Enabled":

![How to enable fine tuning in helix.](fine-tune-enabled.png)

2. Now pick a recent paper from [https://arxiv.org/](https://arxiv.org/) on a subject that's interesting to you (click the "recent" link to find something the base model definitely won't know about).
3. Paste the PDF link into the "Links" field and click the "+" button. You can also paste in plain text or drag and drop documents (pdf, docx) into the file upload form.
4. Click "Continue" and Helix will download and ingest the content.
5. Now chat with the chat bot and ask questions about the paper.
6. Share this chat bot with your friends by clicking the "Share" button.

![](fine-tune-result.png)

If you find yourself stuck in the queue for a long time, you can upgrade to a [paid account](https://app.tryhelix.ai/account) to jump the queue, or [deploy Helix on your own infrastructure](/helix/private-deployment/_index.md).

## Uploading Your Own Fine-Tuning Data

You can also directly upload a sharegpt-style jsonl file to train on directly. But it MUST be called `finetune_dataset.jsonl` and it must have the following format:

```jsonl
{"conversations":[{"from":"human","value":"test test"},{"from":"gpt","value":"yes this is a test"}]}
{"conversations": ...
```

Then use the "Files" upload UI to upload the file. Helix will skip any data preparation phase and train upon this file directly.

## How Fine-Tuning Works

The first step in fine-tuning is generation of the training data.

If you pass text, a document, or a link, Helix will run a series of steps to automatically generate question-answer (QA) pairs on your behalf. You can view these pairs once QA generation is complete.

In the next step, Helix uses low-rank adaptors (LORA) to customise the behaviour of a large language model. These are small, simple custom models that mutate the internal computation of the language model. These changes cause the model to produce outputs that are similar to the QA pairs.

## Fine-Tuning Data Best Practices

* Your data must relevant to the problem (e.g. answer the question)
* More data is better
* Only include data that is relevant to your problem

## Use Case Best Practices

### Question Answering

* Format training data as question-answer pairs
* Ensure your training data includes questions similar to downstream tasks
* Ensure question answer pairs have good "coverage" of your problem domain
