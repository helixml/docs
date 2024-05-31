---
title: Guides - Using Helix
description: How to use Helix to fine-tune models, generate images, and chat with models
weight: 2
aliases:
  - /docs/guides-using-helix
---

Helix offers a variety of powerful features for working with large language models and image generation models. Let's explore some of the key capabilities:

<br>

## Text Inference

Helix provides several large language models optimized for different use cases:

- **Helix 3.5**: Uses Llama3-8B, fast and good for everyday tasks.
- **Helix 4**: Powered by Llama3 70B, smarter but a bit slower.
- **Helix Mixtral**: Uses Mistral 8x7B MoE, we rely on this for some use cases.
- **Helix JSON**: Based on Nous-Hermes 2 Theta, for function calling & JSON output.
- **Helix Small**: Uses Phi-3 Mini 3.8B, fast and memory efficient.

<br>

### Chat to a model

Log in at [app.tryhelix.ai](https://app.tryhelix.ai).

Choose the model you would like to chat with using the dropdown in the toolbar. Let's start with Helix 3.5.

![](models.png)

<br>

Now we'll hit one of the example prompts to get started. "Compose a email regarding project timeline adjustments to a client, explaining the reasons, impacts, and the revised timelines".

![](example.png)

<br>

The model will generate a response based on the prompt provided. You can continue the conversation by adding more prompts or questions.

![](answer.png)

<br>

Share your results with your friends with the "Share" button or on our [Discord](https://discord.gg/VJftd844GE)!

![](share.png)

### Prompt Examples
<br>
<details>
<summary>Marketing Prompts</summary>

- Can you provide me with some ideas for blog posts about [topic of your choice]?
- Write a minute-long script for an advertisement about [product or service or company]
- Write a product description for my [product or service or company]
- Suggest inexpensive ways I can promote my [company] with/without using [Media channel]
- How can I obtain high-quality backlinks to raise the SEO of [Website name]
- Make 5 distinct CTA messages and buttons for [Your product]
- Create a [social media] campaign plan for launching an [your product], aimed at [Your target audience]
- Analyze these below metrics to improve email open rates for a fashion brand <paste metrics>
- Write follow-up emails to people who attended my [webinar topic] webinar
- Structure a weekly [newsletter topic] newsletter
- Make a post showcasing the benefits of using our product [product name] for [specific problem/issue]
- Generate 5 creative ways to use Instagram Reels for [your product or service or company]
- Create a social media post that targets [the specific audience] and explains how our product [product name] can help them
- Create a personalized email greeting for a VIP customer
- Write a list of 5 YouTube video ideas for [your product or company]
- Write a 100-character meta description for my blog post about <topic>

</details>
<br>
<details>
<summary>Product Prompts</summary>

- Analyze the current state of [industry] and its trends, challenges, and opportunities, including relevant data and statistics. Provide a list of key players and a short and long-term industry forecast, and explain any potential impact of current events or future developments
- Offer a detailed review of a <specific software or tool>  for <describe your business>
- Offer an in-depth analysis of the current state of small business legislation and regulations and their impact on entrepreneurship
- Offer a comprehensive guide to small business financing options, including loans, grants, and equity financing
- Provide a guide on managing finances for a small business, including budgeting, cash flow management, and tax considerations
- Provide a guide on networking and building partnerships as a small business owner
- I want to create an agenda for a meeting about <Meeting info> with my team. Can you give me some examples of what should be included?
- I need to write an email to a client regarding a change in the project timeline. Can you give me some guidance on how to phrase it?
- Write an in-depth analysis of the current state of a specific industry and its potential for small business opportunities
- I need to prepare a presentation for a potential investor on <presentation topic>. Can you give me some guidance on what to include?

</details>

<br>

## Image Inference 

Helix uses the [Stable Diffusion XL](https://stability.ai/stable-diffusion) image diffusion models to provide high quality images with relatively small memory GPU footprint, including fine-tuning teach the model new people, styles or concepts to represent visually.

<br>

### Try creating images

Click "New Session", then the dropdown next to "Create Text" and select "Images". Now, prompt the image model with prompts like "interior design of a luxurious master bedroom, gold and marble furniture, luxury, intricate, breathtaking"

![](gsg-04.png)

<br>

<details>
<summary>Good prompts to try for SDXL (Stable Diffusion XL)</summary>

- macro close-up shot of the eyes of a caterpillar
- Cute rabbit wearing a jacket, eating a carrot, 3D Style, rendering
- a cute happy cat, pixel art, pixelated
- (fractal crystal skin:1.1) with( ice crown:1.4) woman, white crystal skin, (fantasy:1.3), (Anna Dittmann:1.3)
- isometric view, isometric style, outdoors, sky, night, moon, neon, building, star (sky), night sky, scenery, city, sign, wide shot, crescent moon, neon lights
- beautiful silhouette shot of a ballerina dancer
- a glowing jellyfish underwater, breathtaking
- photo of a rhino dressed suit and tie sitting at a table in a bar with a bar stools, award winning photography, Elke vogelsang
- b&w photography, model shot, man in subway station, beautiful detailed eyes, professional award winning portrait photography, Zeiss 150mm f/2.8, highly detailed glossy eyes, high detailed skin, skin pores
- a painting of a woman with a butterfly on a yellow wall, graffiti art, inspired by Brad Kunkle, tutu, russ mills, hip skirt wings, andrey gordeev
- a painting of a fish on a black background, a digital painting, by Jason Benjamin, shutterstock, colorful vector illustration, mixed media style illustration, epic full color illustration, mascot illustration
- a painting of a beautiful graceful woman with long hair, a fine art painting, by Qiu Ying, no gradients, flowing sakura silk, beautiful oil painting
- analog film photo of old woman on the streets of london . faded film, desaturated, 35mm photo, grainy, vignette, vintage, Kodachrome, Lomography, stained, highly detailed, found footage
- vaporwave synthwave style Los Angeles street. cyberpunk, neon, vibes, stunningly beautiful, crisp, detailed, sleek, ultramodern, high contrast, cinematic composition
- 16-bit pixel art, a cozy cafe side view, a beautiful day
- claymation style captain jack sparrow on tropical island. sculpture, clay art, centered composition, play-doh

</details>

<br>

## Text Fine-Tuning

![](helix-text-learn.png)

<br>

Helix uses the [Mistral](https://mistral.ai/) series of large language models to provide high quality responses with relatively small memory GPU footprint, including fine-tuning teach the model new information or styles of reasoning and presenting information.

<br>

### Preparing the model to Learn

1. Click "Learn" and select "Text".
2. Now choose your data source. For example, you can pick a recent paper from [https://arxiv.org/](https://arxiv.org/) on a subject that's interesting to you (click the "recent" link to find something the base model definitely won't know about).
3. For example, paste a PDF link into the "add URL" field. You can also paste in plain text or drag and drop documents (pdf, docx) into the file upload form.
4. Click next, then it will generate question-answer pairs from the document that are used to train the model. Accept the default question-answer pairs and it will train the model. This will take about 10 minutes. 
5. Come back when it's finished and then try talking to the chatbot.

![](gsg-05.png)

<br>

### Data Best Practices

* Your data must answer the question
* More data is better
* Only include data that is relevant to your problem

### Use Case Best Practices

#### Question Answering

* Format training data as question-answer pairs
* Ensure your training data includes questions similar to downstream tasks
* Ensure question answer pairs have good "coverage" of your problem domain

#### Inference Best Practices

* Imagine yourself performing the task or answering the question
* If you need to ask questions, then you haven't provided enough context
* If you are asking questions about a thing, indicate what the thing is

<br>

## Image Fine-Tuning

![](helix-image-learn.png)

1. Click "Learn" and select "Image".
2. Now drag and drop some images and label them, for example selfies of yourself or any object or style you want to generate an image model that can copy. You should provide at least 5 examples.
3. Use the prompt "A photo of &lt;s0&gt;&lt;s1&gt;", you can add additional text after that prompt as well, but the "<s0><s1>" bit tells it to reference the concepts in the uploaded images.

![](gsg-06.png)

<br>

### Image Fine-Tuning Demo

{{< youtube "v6XZT8u6khI" >}}

In this demo we feed selfies into Helix and ask it to give us professional headshots. Give it a try and give us feedback on Discord!

## Demo Steps

1. [Start a finetune session on Helix](https://app.tryhelix.ai/?mode=finetune&type=image)
   * Upload some selfies, at least five
2. Run the fine tuning
   * Prompt the finetuned image model with "A photo of <s0><s1>", you can add additional text after that prompt as well, but the "<s0><s1>" bit tells it to reference the concepts in the uploaded images

## Example Sessions
* [https://app.tryhelix.ai/session/e0006f91-c685-4788-ae20-cdc558377033](https://app.tryhelix.ai/session/e0006f91-c685-4788-ae20-cdc558377033)

<br>

Share your results with your friends with the "Share" button or on our [Discord](https://discord.gg/VJftd844GE)!

If you find yourself stuck in the queue for a long time, you can upgrade to a [paid account](https://app.tryhelix.ai/account) to jump the queue, or [deploy Helix on your own infrastructure](/docs/controlplane).

