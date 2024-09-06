---
title: GitOps AI Apps via GitHub
linkTitle: GitOps Apps
description: Create AI Helix Apps direct from GitHub.
weight: 2
tags:
- apps
- github
---

Helix delivers on AI GitOps by watching for Helix Apps in a GitHub repository. Once connected, Helix will receive a webhook from GitHub to tell Helix the App needs updating. So to update your app, simply `git push`!

Follow the instructions below to get started with GitHub Helix Apps.

#### 1. Create your Helix app on Github

{{< tip >}}
The AI Spec must be defined on the root of a Github repo with the name `helix.yaml` for doing this with the UI.
{{< /tip >}}

Click on one of the links below to take you to the template creation page on Github:

- https://github.com/new?template_name=example-app-api-template&template_owner=helixml

Create a new repository using this template. You can make it private if you like, since you will give Helix permission to access all your repos later.

#### 2. Connect your repository to Helix.

1. Click on the menu (three dots) next to the `Signed in as` panel. Then click on `Apps`.
2. Click `New App +` at the top right.
3. Follow the instructions to give Helix access to your repositories. Helix will only access repositories that you maintain/own.
4. Filter the repositories for the one you just created above.
5. Click `Connect Repo`.

This will now clone the repo and add it as an app. The next window shows a summary of the information located in the `helix.yaml`.

From now on, Helix will stay in sync via a Github webhook. Any commit to `main` will result in Helix updating itself.

#### 3. Test Your App

{{< tip >}}
This will be improved soon.
{{< /tip >}}

1. Click on your `App` and scroll to the bottom right. Copy the `key` under `API Keys`. If none exist, you will see an option to create an App API Key.
2. Run a curl request using this key as the bearer token. This will trigger your app. This example uses model llama3:instruct but any [Helix supported AI Model](https://docs.helix.ml/helix/models/models/) can be used.

```bash
curl -i -H "Authorization: Bearer YOUR_APP_API_KEY" https://app.tryhelix.ai/v1/chat/completions --data-raw '{"messages":[{"role":"user","content":"Using the Coinbase API, what is the live Bitcoin price in GBP"}], "model":"llama3:instruct", "stream":false}'
```

You should see a response that looks something like:

```json
{"created":1715691428,"object":"chat.completion","id":"51aaec1f-0ed4-4a06-815a-23171f69aa0c","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"**The live Bitcoin price in GBP is £49,074.38.**"}}],"usage":{"prompt_tokens":0,"completion_tokens":0,"total_tokens":0}}
```
