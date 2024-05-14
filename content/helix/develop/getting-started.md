---
title: Getting Started
description: Learn how to create AI-powered Apps in Helix.
weight: 1
---

This page describes how to create a basic "App" in Helix.

## Introduction

### What is a Helix App?

A Helix App is a way of packaging tools, scripts, user interfaces and configuration to produce an LLM-powered solution. Apps are stored in version control and are tracked by Helix.

## How to Create a Basic App

### 1. Create the App Code

The simplest way to get started is to use our basic app templates. Click on one of the links below to take you to the template creation page on Github:

- https://github.com/new?template_name=example-app-api-template&template_owner=helixml

Create a new repository using this template. You can make it private if you like, since you will give Helix permission to access all your repos later.

### 2. Connect Your Repository

Now it's time to connect your repository to Helix.

1. Click on the menu (three dots) next to the `Signed in as` panel. Then click on `Apps`.
2. Click `New App +` at the top right.
3. Follow the instructions to give Helix access to your repositories. Helix will only access repositories that you maintain/own.
4. Filter the repositories for the one you just created above.
5. Click `Connect Repo`.

This will now clone the repo and add it as an app. The next window shows a summary of the information located in the `helix.yaml`.

From now on, Helix will stay in sync via a Github webhook. Any commit to `main` will result in Helix updating itself.

### 3. Test Your App

{{< tip >}}
This will be improved soon.
{{< /tip >}}

1. Click on your `App` and scroll to the bottom right. Copy the `key` under `API Keys`.
2. Run a curl request using this key as the bearer token. This will trigger your app.

```bash
curl -i -H "Authorization: Bearer YOUR_API_KEY" https://app.tryhelix.ai/v1/chat/completions --data-raw '{"messages":[{"role":"user","content":"Using the Coinbase API, what is the live Bitcoin price in GBP"}],"stream":false}'
```

You should see a response that looks something like:

```json
{"created":1715691428,"object":"chat.completion","id":"51aaec1f-0ed4-4a06-815a-23171f69aa0c","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"**The live Bitcoin price in GBP is £49,074.38.**"}}],"usage":{"prompt_tokens":0,"completion_tokens":0,"total_tokens":0}}
```

## Control Plane Configuration

The following environmental variables are used to configure how the control plane runs Apps.

```bash
# https://github.com/helixml/helix/blob/main/api/pkg/config/config.go#L68
TOOLS_ENABLED=true # Enables tool usage
# https://github.com/helixml/helix/blob/main/api/pkg/config/config.go#L69
TOOLS_PROVIDER=helix # Which provider to use with tools
# https://github.com/helixml/helix/blob/main/api/pkg/config/config.go#L75
TOOLS_MODEL=llama3:instruct # Which model to use with tools
```

{{< tip >}}
Note that the model used for Apps is hardcoded in the control plane config. It is not user-selectable.
{{< /tip >}}

## Runner Configuration

The following environmental variables are used to configure how the runner runs Apps.

```bash
# https://github.com/helixml/helix/blob/main/api/pkg/config/runner_config.go#L36
RUNTIME_OLLAMA_WARMUP_MODELS=llama3:70b,llama3:instruct # Which models are available on this runner. 
```