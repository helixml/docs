---
title: Analyze Website Content
linkTitle: Website Content
description:
weight: 4
aliases:
  - /docs/website-content
  - /helix/text-fine-tuning-examples/website-content/
tags:
- text-fine-tune
---

{{< youtube "lca52jWU0Ac" >}}

In this demo I will use helix to analyse what I have written in the past year on the winder.ai website. First I will capture all of the text, then I will feed that into helix, and finally I will analyse the results.

## Steps

1. [Start an inference session on Helix](https://app.tryhelix.ai/?mode=inference&type=text)
2. Type a question relating to the user and note how incorrect it is, e.g.:
   * As of December 2023, which LLM has the largest context window size according to the table?
2. Scrape data from website. In my case, I’ve catted all the markdown into one file.
4. [Start a finetune session on Helix](https://app.tryhelix.ai/?mode=finetune&type=text)
   * Go to Helix and add this text to the fine tune section
5. When finished, re-ask some interesting questions:
   * As of December 2023, which LLM has the largest context window size according to the table?
   * Where does RL find its most effective applications?
   * What are the main topics that have been discussed in the document in 2023?
<!--
## Example Sessions
* [https://app.tryhelix.ai/session/9912e0b9-4276-4730-a94a-14b77853758f](https://app.tryhelix.ai/session/9912e0b9-4276-4730-a94a-14b77853758f) -->

Share your results with your friends with the "Share" button or on our [Discord](https://discord.gg/VJftd844GE)!