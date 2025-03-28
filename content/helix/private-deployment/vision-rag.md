---
title: Vision RAG with Haystack and VLLM
description: Learn how to configure Helix to deliver vision RAG.
weight: 20
tags:
- config
---

This guide explains how to enable and configure vision RAG (Retrieval-Augmented Generation) in Helix. Before proceeding, ensure you have a [private Helix deployment](helix/private-deployment/_index.md) up and running.

## Introduction

Vision RAG extends Helix's capabilities to understand and reason about visual content in your applications. This powerful feature enables your system to process and analyze images, including those found in PDFs containing graphics, plots, tables, and other visual elements.

### What is Vision RAG?

Vision RAG, inspired by [colpali](https://github.com/illuin-tech/colpali), combines vision embedding models with multi-modal language models to extract insights from visual content. Here's how it works:

1. **Ingestion Process**:
   - PDFs are processed page by page, converting each page into images
   - A vision embedding model converts these images into vector representations
   - These vectors are stored in a vector database for efficient retrieval

2. **Query Process**:
   - When a query is received, the system searches the vector database for relevant images
   - Retrieved images are processed by a multi-modal vision/text language model
   - The model interprets the visual content and generates relevant responses

This enables users to ask questions and receive insights about visual content in their documents.

## Setting Up Vision RAG

### Prerequisites

To enable Vision RAG in Helix, you'll need to:

1. Run the Haystack RAG service
2. (Optionally) Deploy multiple vLLM nodes

### Supported Models and Providers

We've validated Vision RAG with the following configurations:

#### vLLM

- **Embeddings**

  ```bash
  vllm serve --model MrLight/dse-qwen2-2b-mrl-v1 --task embed --max-model-len 8192 \
             --trust-remote-code --chat-template examples/template_dse_qwen2_vl.jinja
  ```

- **Chat**

  ```bash
  vllm serve --model Qwen/Qwen2.5-VL-3B-Instruct --max-model-len 16384 \
             --gpu-memory-utilization 0.65 --trust-remote-code --limit-mm-per-prompt image=10
  ```

#### OpenAI

- **Chat**: `gpt-4-turbo`

> 💡 We welcome community feedback on successful implementations with other models!

### Haystack Configuration

Configure Vision RAG by setting these environment variables in your Haystack container/pod:

```bash
RAG_VISION_ENABLED=false              # Set to true to enable Vision RAG
RAG_VISION_BASE_URL=                  # Your vision service base URL (if not using a socket)
RAG_VISION_EMBEDDINGS_SOCKET=         # Socket configuration (if using a socket)
RAG_VISION_API_KEY=                   # API key for vision service
RAG_VISION_EMBEDDINGS_MODEL="MrLight/dse-qwen2-2b-mrl-v1"
RAG_VISION_EMBEDDINGS_DIM=1536        # Embedding dimensions for embedding model
RAG_VISION_PGVECTOR_TABLE=haystack_documents_vision # Name of table in pgvector
```

### App Configuration

In your App definition, you will also need to:

1. Select a multi-modal model capable of understanding images. E.g. `Qwen/Qwen2.5-VL-3B-Instruct` or `gpt-4-turbo`.
2. Edit a knowledge and check the `Enable Vision` checkbox.

## Known Limitations

- Designed to work with PDFs. Get in touch if you'd like more data types!
- We have only tested with the "Supported Models and Providers" above, however other models may work!
- Together AI did not work well as the vision chat model.
- Have not tested at scale.
