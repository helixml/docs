---
title: Gain Insights from Recent Published Papers
linkTitle: Paper Analysis
description:
weight: 1
aliases:
  - /docs/papers
  - /helix/text-fine-tuning-examples/papers/
---

{{< youtube "xQHYMzo_KS0" >}}

In this demo I will use Helix to learn from recently published academic papers and provide insight. I will search arxiv, a popular openly accessible paper website, for a recent technical topic. Then I will take those results and ask Helix to fine tune a large language model based upon them. Then I will be able to gain insight from these articles.

## Steps

1. [Start an inference session on Helix](https://app.tryhelix.ai/?mode=inference&type=text)
2. Type a question relating to the topic of interest and note how incorrect it is, e.g.:
   * How are LLMs improving 6G communications networks?
   * What components make up the proposed multi-agent system for 6G communications?
   * What is Multi-agent Data Retrieval in multi-agent systems for 6G communications?
   * How does Multi-agent Data Retrieval work in multi-agent systems for 6G communications?
   * Generate 3 blog post titles based upon recent papers about the use of LLMs in 6G communication networks.
3. [Start a finetune session on Helix](https://app.tryhelix.ai/?mode=finetune&type=text)
   * Search Arxiv for papers of interest, e.g.:
   * https://arxiv.org/search/?query=+6G+communications+llms&searchtype=all
   * Copy the Links of the PDFs and paste them into Helix’s “Add link” section, one by one. E.g.:
     * https://arxiv.org/pdf/2312.07850
     * https://arxiv.org/pdf/2311.05842
     * https://arxiv.org/pdf/2308.09376
   * Hit finetune
4. When finished, re-ask the same questions:
   * How are LLMs improving 6G communications networks?
   * What components make up the proposed multi-agent system for 6G communications?
   * What is Multi-agent Data Retrieval in multi-agent systems for 6G communications?
   * How does Multi-agent Data Retrieval work in multi-agent systems for 6G communications?
   * Generate 3 blog post titles based upon recent papers about the use of LLMs in 6G communication networks.

<!-- ## Example Sessions
* [https://app.tryhelix.ai/session/f680a35f-6e99-4188-96d4-9582dbf2ef56](https://app.tryhelix.ai/session/f680a35f-6e99-4188-96d4-9582dbf2ef56) -->

Share your results with your friends with the "Share" button or on our [Discord](https://discord.gg/VJftd844GE)!