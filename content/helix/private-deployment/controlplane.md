---
title: Installing Helix Quick Start
linkTitle: "Install Quick Start"
description: Learn how to install Helix on your own infrastructure.
weight: 1
aliases:
  - /docs/controlplane
tags:
- install
---

## tl;dr

Linux | macOS | Windows (WSL2)

```
curl -sL -O https://get.helix.ml/install.sh && bash install.sh
```

Follow the instructions to install Helix on your local machine. Installer will prompt you before making any changes.

[View source](https://get.helix.ml) | [Manual instructions](/helix/private-deployment/manual-install.md) | [Kubernetes](/helix/private-deployment/manual-install/kubernetes.md) | [Discord](https://discord.gg/VJftd844GE)

<br/>
<br/>
<br/>
<br/>

## Requirements

{{< include "requirements.md" >}}

## Download the Helix Installer

Use the installer script to get started with Helix quickly. Run the following commands to download and make the installer executable:

```bash
curl -sL -O https://get.helix.ml/install.sh
chmod +x install.sh
```

Now run the installer and follow the instructions with `sudo ./install.sh`. You will be prompted before any changes are made to your system.

You can also run `./install.sh --help` to see what options are available, or read on for common configuration options.

## Installer Examples

### Just install the CLI

```
./install.sh --cli
```

This will just install the CLI on its own. Useful if you want to connect to a Helix deployment from another machine.

### Local Helix on Linux or Windows (WSL2) with a GPU

This will set up the CLI, the controlplane and a runner on localhost if a GPU is available:
```
sudo ./install.sh
```

* If you have an older GPU (e.g. NVIDIA 1060, 1080 series), specify `--older-gpu`. This will disable image inference and text/image fine-tuning, which only works on newer GPUs (e.g. 3090 onwards).
* If you want to use text fine-tuning, as well as needing a newer GPU (e.g. 3090 onwards) you also need to set `--hf-token <YOUR_TOKEN>` to a valid Huggingface token, then you now need to accept sharing your contact information with Mistral [here](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1) and then fetch an access token from [here](https://huggingface.co/settings/tokens) and then specify it in this parameter.

This will create a `HelixML` directory with the following files:
* `docker-compose.yaml` - the compose file for the control plane
* `.env` - appropriately configured secrets and configuration for the control plane
* `runner.sh` - script to start the runner assuming a local GPU

It will print out instructions on how to start everything.

### Install alongside Ollama on macOS, Linux or Windows

Install locally alongside Ollama already running:
```
./install.sh --openai-api-key ollama --openai-base-url http://host.docker.internal:11434/v1
```

This assumes you have downloaded some models with Ollama, for example by running:
```
ollama pull llama3:instruct
```
These models will then show up in the Helix UI.

This won't work with image inference or text/image fine-tuning. Connect a full GPU to enable those features.


### Install Control Plane pointing at TogetherAI

Install CLI and controlplane locally with external [TogetherAI](https://together.ai) API key:

```
./install.sh --cli --controlplane --together-api-key YOUR_TOGETHER_API_KEY
```

This won't work with image inference or text/image fine-tuning. Connect a full GPU to enable those features.

### Set up Control Plane with a DNS name

If you want to make your Helix deployment available to other people, you should get a domain name or subdomain and set up an A record pointing to the IP address of your Control Plane server.

Then, you can install the CLI and Control Plane on the server, specifying the DNS name, and the installer will automatically set up TLS with [Caddy](https://caddyserver.com/):
```
./install.sh --cli --controlplane --api-host https://helix.mycompany.com
```

The automatic Caddy installation currently only works on Ubuntu.

See [Manual Install](/helix/private-deployment/manual-install.md) for full instructions on other platforms.


### Attach a Runner to an existing Control Plane

Install just the runner, pointing to a controlplane with a DNS name (find runner token in `/opt/HelixML/.env` on the control plane node):

```
./install.sh --runner --api-host https://helix.mycompany.com --runner-token YOUR_RUNNER_TOKEN
```

### Install Control Plane pointing at any OpenAI-compatible API

Install the CLI and controlplane locally with OpenAI-compatible API key and base URL:

```
./install.sh --cli --controlplane --openai-api-key YOUR_OPENAI_API_KEY --openai-base-url YOUR_OPENAI_BASE_URL
```

This won't work with image inference or text/image fine-tuning. Connect a full GPU to enable those features.

## Upgrading

Just run the installer again. It will reuse secrets in your `.env` file and back it up in case you need to copy over any changes.

## (Optional) Enabling Helix Apps

{{< include "configure-apps.md" >}}

## (Optional) Securing Helix

{{< include "configure-security.md" >}}

## More Configuration

For further configuration options you can put in your `.env` file, such as connecting GitHub for easy `git push` deployment of [Helix Apps](/helix/develop/apps.md), check the [manual install docs](/helix/private-deployment/_index.md).
