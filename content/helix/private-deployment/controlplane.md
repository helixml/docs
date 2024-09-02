---
title: "Quickstart: Install Helix"
description:
weight: 1
aliases:
  - /docs/controlplane
---

<br/>
<br/>

## tl;dr

macOS | Linux | Windows (WSL2)

```
curl -sL -O https://get.helix.ml/install-helix.sh && bash install-helix.sh
```

Follow the instructions. Installer will prompt you before making any changes.

[View source](https://get.helix.ml) | [Manual instructions](/helix/private-deployment/manual-install/) | [Kubernetes](/helix/private-deployment/helix-controlplane-helm-chart/)

<br/>
<br/>
<br/>
<br/>

## Requirements

* **Control Plane** is the Helix API, web interface, and postgres database and requires:
  * Linux, macOS or Windows
  * [Docker](https://docs.docker.com/get-started/get-docker/)
* **Inference Provider** requires one of:
  * An NVIDIA GPU to use with Helix Runners ([example](/helix/private-deployment/controlplane/#local-helix-on-linux-or-windows-wsl2-with-a-gpu)), or
  * [Ollama](https://ollama.com) running locally ([example](/helix/private-deployment/controlplane/#install-alongside-ollama)), or
  * An OpenAI-compatible API provider, such as [TogetherAI](https://together.ai) ([example](/helix/private-deployment/controlplane/#install-control-plane-pointing-at-togetherai)) - we like TogetherAI because you can run the same open source models via their API that you can run locally using Helix GPU Runners, but you can use any OpenAI-compatible API.
* 50GB+ disk space for control plane, 100GB+ of disk space for runner
* A fast internet connection (llamaindex container is about 11GB, small runner image is 23GB)

For Kubernetes, see [Control Plane on K8s](/helix/private-deployment/helix-controlplane-helm-chart/) and [Runners on K8s](/helix/private-deployment/helix-runner-helm-chart/).  See also: [Architecture](/helix/getting-started/architecture).

## Download the Helix Installer

To quickly get started with Helix, you can use our installer script. Run the following commands to download and make the installer executable:

```bash
curl -Ls -o install-helix.sh https://get.helix.ml
chmod +x install-helix.sh
sudo ./install-helix.sh
```

Now run the installer and follow the instructions. You will be prompted before any changes are made to your system.

You can also run `./install-helix.sh --help` to see what options are available.

## Examples

### Local Helix on Linux or Windows (WSL2) with a GPU

This will set up the CLI, the controlplane and a runner on localhost if a GPU is available:
```
sudo ./install-helix.sh
```

If you have an older GPU (e.g. NVIDIA 1060, 1080 series), specify `--older-gpu`. This will disable image inference and text/image fine-tuning, which only works on newer GPUs (e.g. 3090 onwards).

This will create `/opt/HelixML` with the following files:
* `docker-compose.yaml` - the compose file for the control plane
* `.env` - appropriately configured secrets
* `runner.sh` - script to start the runner assuming a local GPU

It will print out instructions on how to start everything.


### Just install the CLI

```
./install-helix.sh --cli
```

This will just install the CLI on its own. Useful if you want to connect to a Helix deployment from another machine.


### Install alongside Ollama on macOS, Linux or Windows

Install locally alongside Ollama already running:
```
./install-helix.sh --openai-api-key ollama --openai-base-url http://host.docker.internal:11434/v1
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
./install-helix.sh --cli --controlplane --together-api-key YOUR_TOGETHER_API_KEY
```

This won't work with image inference or text/image fine-tuning. Connect a full GPU to enable those features.

### Set up Control Plane with a DNS name

If you want to make your Helix deployment available to other people, you should get a domain name or subdomain and set up an A record pointing to the IP address of your Control Plane server.

Then, you can install the CLI and Control Plane on the server, specifying the DNS name, and the installer will automatically set up TLS with [Caddy](https://caddyserver.com/):
```
./install-helix.sh --cli --controlplane --api-host https://helix.mycompany.com
```

The automatic Caddy installation currently only works on Ubuntu.
See [Manual Install](/helix/private-deployment/manual-install/) for full instructions on other platforms.


### Attach a Runner to an existing Control Plane

Install just the runner, pointing to a controlplane with a DNS name (find runner token in `/opt/HelixML/.env` on the control plane node):
```
./install-helix.sh --runner --api-host https://helix.mycompany.com --runner-token YOUR_RUNNER_TOKEN
```

### Install Control Plane pointing at any OpenAI-compatible API

Install the CLI and controlplane locally with OpenAI-compatible API key and base URL:

```
./install-helix.sh --cli --controlplane --openai-api-key YOUR_OPENAI_API_KEY --openai-base-url YOUR_OPENAI_BASE_URL
```

This won't work with image inference or text/image fine-tuning. Connect a full GPU to enable those features.

## Upgrading

Just run the installer again. It will reuse secrets in your `.env` file and back it up in case you need to copy over any changes.

## Security

After deploying Helix, be sure to [lock it down](/helix/private-deployment/manual-install/#locking-down-the-stack).
