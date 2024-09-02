---
title: Developing Helix Apps
linkTitle: Apps
description: Learn how to create AI-powered Apps in Helix.
weight: 1
aliases:
- /helix/develop/getting-started/
- /helix/develop/helix-tools/
---

This page describes how to create a basic "App" in Helix.

## Introduction

### What is a Helix App?

A Helix App is a way of packaging tools, scripts, user interfaces and configuration to produce an LLM-powered solution. Apps are stored in version control and are tracked by Helix.

{{< tip >}}
If you are self hosting the control plane, you will need to [setup a Github App first]({{< ref "/helix/private-deployment/controlplane.md#enabling-helix-apps" >}}) before the following will work.
{{< /tip >}}

## How to Create a Basic App

### 1. Create the App Code

The simplest way to get started is to use our basic app templates. Click on one of the links below to take you to the template creation page on Github:

- https://github.com/new?template_name=example-app-api-template&template_owner=helixml

Create a new repository using this template. You can make it private if you like, since you will give Helix permission to access all your repos later.

Add your OpenAPI Specification (OAS) to the repo and update `helix.yaml` to use your OAS.

```
name: Name of your Helix app
description: A human readable description for your app
assistants:
- name: Nme
  apis:
    - name: Name of API
      description: API Description
      url: API Server URL
      schema: Relative path to OAS.yaml
```

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
2. Run a curl request using this key as the bearer token. This will trigger your app. This example uses model llama3:instruct but any [Helix supported AI Model](https://docs.helix.ml/helix/models/models/) can be used.

```bash
curl -i -H "Authorization: Bearer YOUR_API_KEY" https://app.tryhelix.ai/v1/chat/completions --data-raw '{"messages":[{"role":"user","content":"Using the Coinbase API, what is the live Bitcoin price in GBP"}], "model":"llama3:instruct", "stream":false}'
```

You should see a response that looks something like:

```json
{"created":1715691428,"object":"chat.completion","id":"51aaec1f-0ed4-4a06-815a-23171f69aa0c","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"**The live Bitcoin price in GBP is £49,074.38.**"}}],"usage":{"prompt_tokens":0,"completion_tokens":0,"total_tokens":0}}
```

## Control Plane Configuration for Private Deployments:

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

## Runner Configuration for Private Deployments

The following environmental variables are used to configure how the runner runs Apps.

```bash
# https://github.com/helixml/helix/blob/main/api/pkg/config/runner_config.go#L36
RUNTIME_OLLAMA_WARMUP_MODELS=llama3:70b,llama3:instruct # Which models are available on this runner.
```

## App Configuration

Below is an example `helix.yaml` file specifically for Apps. This example has an API tool included (using a GPTScript tool should look similar to that described in the [GPTScript documentation](/helix/develop/gptscript-apps.md)).

```yaml
name: My test API # UI use only
description: This description is only for UI purposes  # UI use only
assistants:
- name: My assistant  # UI use only
  apis:
    - name: API Adaptor Service  # UI use only
      description: Adaptor for API  # UI use only
      url: http://some-valid-url # Must be accessible from the Helix control plane
      schema: ./api/openapi.yaml # Must point to the OpenAPI specification
      query: # A list of query parameters to use as defaults and/or be overridden in the request
        page: "1"
        filter: "hello world"
```

### Overriding Query Parameters

If you need to pass query parameters to your backend service at query time, then you can pass through query parameters using the OpenAI API.

1. First define the query parameter in the `helix.yaml` App specification and give it a default.
2. Then request the OpenAI API as normal but append your query parameters. Note that they should be encoded. For example:

  ```bash
  curl -H "Authorization: Bearer YOUR_API_KEY" https://helix-control-plane.host/v1/chat/completions?page%3D5%26filter%3Dhi%20there --data-raw '{"model": "llama3:instruct", "messages":[{"role":"user","content":"Hi please use the API I have provided to get data"}]}'
  ```

## Troubleshooting

- **When I submit a request that uses an App, it hangs. Why?**

  Check the API logs.

- **Why do the logs show: `No tools api client has been configured`?**

  This means that you haven't configured Helix to use Apps correctly. See the section about [Helix control plane configuration for private deployments](#control-plane-configuration-for-private-deployments).

- **Why do the logs show: `unable to look up model xxxxx, possible programming error in adding model to models map ...`?**

  This means you haven't specified the `TOOLS_MODEL` correctly. Please use a valid model name.