---
title: Quickstart
description: How to get started with Helix
weight: 1
aliases:
  - /docs/quickstart
---

These instructions show you how to log into [Helix Cloud](https://app.tryhelix.ai/) and use it.

For deploying to your own infrastructure, see [Deploying Control Plane](/docs/controlplane).

## Welcome to Helix

Here's a quick overview of how to get started:

1. [Sign up](https://app.tryhelix.ai/) for a Helix account or [log in](https://app.tryhelix.ai/) if you already have one.

2. Explore the [Helix app](https://app.tryhelix.ai) and try out some of the example prompts to get a feel for what's possible.

3. [Fine-tune a model](#fine-tuning-a-text-model) to adapt it to your specific use case and data.

4. Dive deeper into the [Helix architecture](/docs/architecture) to understand how it all works under the hood.

If you have any questions along the way, check out our [FAQ](#frequently-asked-questions) or reach out to our support team.

<br>

## Sign up for an account

You can create a new username and password or log in with Google

![](gsg-02.png)

<br>

## Log in

Go to [https://app.tryhelix.ai](https://app.tryhelix.ai)

![](gsg-01.png)

<br>

## Using Helix

### Try chatting to the chatbot

Ask it "give me 3 ideas for a blog post about an AI powered bicycle"

![](gsg-03.png)

<details>
<summary>More prompt examples</summary>

- "What are some potential use cases for AI in healthcare?"
- "Can you help me brainstorm ideas for a science fiction story about robots?"
- "How might AI be used to improve education and learning?"

</details>

Share your results with your friends with the "Share" button!

### Try creating images

Click "New Session", then the dropdown next to "Create Text" and select "Images". Now, prompt the image model with prompts like "interior design of a luxurious master bedroom, gold and marble furniture, luxury, intricate, breathtaking"

![](gsg-04.png)

<details>
<summary>More prompt examples</summary>

- "A beautiful sunset over a tranquil beach, vibrant colors, detailed"
- "A futuristic city skyline at night, neon lights, cyberpunk style"
- "A cute, cartoon-style kitten playing with a ball of yarn"

</details>

Share your results with your friends with the "Share" button!

<br>

### Fine-tuning a text model

1. Click "Finetune" and select "Text".
2. Now pick a recent paper from [https://arxiv.org/](https://arxiv.org/) on a subject that's interesting to you (click the "recent" link to find something the base model definitely won't know about).
3. Paste the PDF link into the "add URL" field. You can also paste in plain text or drag and drop documents (pdf, docx) into the file upload form.
4. Click next, then it will generate question-answer pairs from the document that are used to train the model. Accept the default question-answer pairs and it will train the model. This will take about 10 minutes. 
5. Come back when it's finished and then try talking to the chatbot.
6. You can now share your trained model by clicking the "share" button on the page.

![](gsg-05.png)

<br>

### Fine-tuning an image model

1. Click "Finetune" and select "Image".
2. Now drag and drop some images and label them, for example selfies of yourself or any object or style you want to generate an image model that can copy. You should provide at least 5 examples.
3. Use the prompt "A photo of <s0><s1>", you can add additional text after that prompt as well, but the "<s0><s1>" bit tells it to reference the concepts in the uploaded images.
4. Feel free to share your session so that others can use your fine-tuned model!

![](gsg-06.png)

If you find yourself stuck in the queue for a long time, you can upgrade to a [paid account](https://app.tryhelix.ai/account) to jump the queue, or [deploy Helix on your own infrastructure](/docs/controlplane).

<br>

## Frequently asked questions

<br>

### What makes Helix different?

We allow you to safely bring LLMs into your business by running models in your environment. This means you have zero data leakage risk and can develop your own fine-tuned LLM that remains your core IP.

<br>

### How hard is it to get started?

See [getting started](/docs/getting-started)!

You can start chatting with open source language models and generating images with Stable Diffusion XL by [creating a free account](https://app.tryhelix.ai) right now. Fine-tuning your own model on your own text or image data is as simple as drag’n’drop, and takes 3-10 minutes. You can then chat with and generate images from those fine-tuned models straight away, all using a familiar chat interface.

<br>

### My data is private, how can I train models on it securely without the data leaving my company’s infrastructure?

This is where Helix really shines – because the models are open source, you are free to fine-tune them on your own infrastructure, and Helix makes that as easy as half a day with a DevOps Engineer. Try it out on some of our sample data to get a feel for what it’s capable of, and then invite your DevOps Engineer to our [deployment guide](/docs/controlplane), and [shoot us an email](mailto:founders@helix.ml) at the same time.

<br>

### Can I integrate my models with my own apps or business apps once I’ve got it working?

Yes, we plan to offer OpenAI and Stability-SDK compatible APIs. These will be published on our documentation soon. [Get in touch with us](mailto:founders@helix.ml) for early access.

<br>

### What if I get stuck in the queue?

If you find yourself stuck in the queue for a long time, you can upgrade to a [paid account](https://app.tryhelix.ai/account) to jump the queue, or [deploy Helix on your own infrastructure](/docs/controlplane).

<br>

### How can I learn more about fine-tuning models?

Check out our [Fine-tuning Guide](/docs/fine-tuning) for a deep dive into the process of adapting models to your specific use case.

