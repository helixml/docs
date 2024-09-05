---
title: Understand Which Content Your Customers Find Engaging and Generate Content Ideas
linkTitle: Engaging Customer Content
description:
weight: 2
aliases:
  - /docs/engaging-content
  - /helix/text-fine-tuning-examples/engaging-content/
tags:
- text-fine-tune
---

{{< youtube "SKJfyj2ROfY" >}}

In this demo I will use Helix to help me analyse my ideal customer personas. This allows me to better understand my customers needs. Specifically I am going to investigate what content my ideal customers like to engage with, so I can generate more engaging marketing content.

## Steps

1. [Start an inference session on Helix](https://app.tryhelix.ai/?mode=inference&type=text)
2. Type a question relating to the user and note how incorrect it is, e.g.:
   * What content does Phil Winder like to read?
   * Give me 3 example article titles of the content that Phil Winder likes to share?
   * What one thing does Phil Winder care about most?
   * What is Phil Winder working on at the moment?
   * You have been fine-tuned upon articles that have been shared by Phil Winder. Please write 3 new titles for content that Phil is likely to create.
3. [Start a finetune session on Helix](https://app.tryhelix.ai/?mode=finetune&type=text)
   * Browse to linkedin and find the person of interest. When demoing to others, only use your own profile or someone you have permission from.
   * Click on “Activity” in LinkedIn.
   * Scroll down to load more and more activity content. The more the better.
   * In your browser, click File -> Save and save the HTML.
   * Go to Helix and add this file to the files section of the fine-tune
   * Hit finetune
4. When finished, re-ask the same questions:
   * What content does Phil Winder like to read?
   * Give me 3 example article titles of the content that Phil Winder likes to share?
   * What one thing does Phil Winder care about most?
   * What is Phil Winder working on at the moment?
   * You have been fine-tuned upon articles that have been shared by Phil Winder. Please write 3 new titles for content that Phil is likely to create.
<!--
## Example Sessions
* [https://app.tryhelix.ai/session/af003c5b-c7ba-46ab-9a25-260beb0e932d](https://app.tryhelix.ai/session/af003c5b-c7ba-46ab-9a25-260beb0e932d) -->

Share your results with your friends with the "Share" button or on our [Discord](https://discord.gg/VJftd844GE)!