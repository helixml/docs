---
title: Quick Start
weight: 2
next: /searchbot/concepts/_index.md
---

This document explains how to quickly get started with SearchBot. You should probably follow these steps first, unless you have used SearchBot in the past. For more in-depth explanations, please see the rest of the documentation.

## 1. Sign up for an account

Go to [https://SearchBot.tryhelix.ai](https://searchbot.tryhelix.ai)

![](registration.png)

## 2. Add a website

Navigate to the [Websites page]({{< param "searchbot.urls.websites" >}}) and add a Website that you want to use with SearchBot. SearchBot will use all of the content on your Website as sources of information.

![](add-website.png)

![](add-website-information.png)

Please wait until your website has finished scanning. Click on the `Bots` tab.

![](scraping-finished.png)

{{% tip %}}
More information about Websites can be found in the [Website documentation]({{< relref "/searchbot/concepts/websites/index.md" >}}).
{{% /tip %}}

## 3. Add a bot

Now add a bot and specify the settings for the bot. You should tick the box of the website you have just scanned.

![](add-bot.png)

![](add-bot-info.png)

Your bot is now learning your content. It will take a while to complete this step, so please come back later.

When it has finished, please click on the bot.

![](bot-finished.png)

## 4. Test and share with friends

Click the share button.

![](bot-share.png)

Share your SearchBot with your friends by copying the URL. It is publicly accessible.

Type a query into the form on the share page and see how well SearchBot performs!

![](share.png)

## 5. Add SearchBot to your website
 
Add SearchBot to your website by copying and pasting the code in the Bot detail page.

![](bot-add-to-website.png)

The instructions will look like this, with your settings templated in:

```js
<script 
    src="https://cdn.jsdelivr.net/npm/@helixml/chat-embed@0.3.2" 
    integrity="sha384-8/N8VED70naygSrRj1BYT5JlMwVLit5cPnT3HkKsLJ74L9fm+oNDVM9HFIOz5f8a" 
    crossorigin="anonymous" >
</script>
<script>
ChatWidget({
    url: "https://searchbot.tryhelix.ai/v1/chat/completions", 
    model: "YOUR_BOT_ID_HERE" })
})
</script>
```
