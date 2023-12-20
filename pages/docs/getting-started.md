---
title: Get started with Helix
description: How to get started with Helix
---

# {% $markdoc.frontmatter.title %}

These instructions show a user how to log into [Helix Cloud](https://app.tryhelix.ai/) and use it. For deploying to your own infrastructure, see [Deploying Control Plane](/docs/controlplane).

1. Go to [https://app.tryhelix.ai](https://app.tryhelix.ai)
2. Sign up for an account. You can create a new username and password or log in with Google
3. Try chatting to the chatbot. Ask it "give me 3 ideas for a blog post about an AI powered bicycle"
4. Try creating images. Click the dropdown next to "Create Text" and select "Images". Now, prompt the image model with prompts like "interior design of a luxurious master bedroom, gold and marble furniture, luxury, intricate, breathtaking"
5. Now let's fine tune a text model. Click "Finetune" and select "Text". Now pick a recent paper from [https://arxiv.org/](https://arxiv.org/) on a subject that's interesting to you (click the "recent" link to find something the base model definitely won't know about). Paste the PDF link into the "add URL" field. You can also paste in plain text or drag and drop documents (pdf, docx) into the file upload form. Click next, then it will generate question-answer pairs from the document that are used to train the model. Accept the default question-answer pairs and it will train the model. This will take about 10 minutes. Come back when it's finished and then try talking to the chatbot. You can now share your trained model by clicking the "share" button on the page.
6. Now let's fine tune an image model. Click "Finetune" and select "Image". Now drag and drop some images and label them, for example selfies of yourself or any object or style you want to generate an image model that can copy. Use the prompt "A photo of <s0><s1>", you can add additional text after that prompt as well, but the "<s0><s1>" bit tells it to reference the concepts in the uploaded images. Feel free to share your session so that others can use your fine-tuned model!

If you find yourself stuck in the queue for a long time, you can upgrade to a [paid account](https://app.tryhelix.ai/account) to jump the queue, or [deploy Helix on your own infrastructure](/docs/controlplane).