---
title: GPTScript Food Recommendations
linkTile: GPTScript Recommendations
description: Use Helix with GPTScript to build a recommendations app with a frontend.
weight: 1
---

You can use this sample React app as a starting point for your own AI powered apps.

![](apps-04.png)

## Step 1: Fork the example repo

Go to GitHub and fork [github.com/helixml/demo-recipes](https://github.com/helixml/demo-recipes).

## Step 2: Connect the repo to Helix Cloud

Go to [app.tryhelix.ai/apps](https://app.tryhelix.ai/apps) and click New App:

![](apps-05.png)

Connect to your GitHub account, then select the fork from the dropdown:

![](apps-06.png)

Click the play button. Click Connect Repo.

This will set up a deploy key and webhooks so that Helix can read the contents of the repo (even if it's private) and be notified when you push to the git repo so that Helix can automatically deploy changes to the gptscripts.

## Step 3: Deploy the frontend app somewhere

Now deploy the frontend app to a web server of your choice, for example Netlify, Vercel, or your own internal web application platform.

You can skip this step if you just want to test local development for now.

## Step 4: Local Development

Clone the repo locally, [get an API key from OpenAI](https://github.com/gptscript-ai/gptscript?tab=readme-ov-file#2-get-an-api-key-from-openai) and then run:

Run:
```bash
bash helix-server.sh
```
This will start the helix dev server, which runs gptscript in a container locally on your machine.

The `apps-client` JS library will automatically try to connect to the gptscript dev server if you are running the app locally.

Now start the server:
```bash
yarn install
yarn start
```

The app should pop up in your browser:

![](apps-07.png)

Start by putting your name in the box, and see that the "hello world" `gptscripts/welcome.gpt`:
```
description: Returns back the input of the script
args: input: Any string
echo "Welcome ${input}!"
```
Indeed returns "welcome, yourname".

Now, enter either `alice@alice.com` or `bob@bob.com` (since these are the users who are registered in the bundled sqlite database in the demo) and select a type of recipe you'd like to recommend to them based on their purchase history.

If you watch the helix dev server, you'll be able to see gptscript doing its thing.

![](apps-08.png)

## Step 5: Deploy to Production

Now you should have the github repo (your fork) hooked up to an external hosting service like Netlify or Vercel (step 3) and also hooked up to Helix Cloud, where Helix can receive the webhooks and immediately deploy updates to the gptscripts.

Try changing something, for example add a word to the suggested summary/justification field in `waitrose.gpt`, then just do:

```
git commit -am "deploy change to wording"
git push
```

Now Helix will receive the webhook from GitHub and instantly future requests for that gptscript will use the updated version.

## Step 6: Customize the app for your own use case

You've seen how you can develop a sophisticated, AI powered app just with Javascript and natural language (and a bit of sqlite).
Start customizing the app for your own use cases. We'd love to see what you build!

## Come talk to us!

Come join us in [Discord](https://discord.gg/VJftd844GE) to give us feedback on this and talk about your use case!
We'd love to see what you build.
