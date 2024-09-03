---
title: "Manually Deploying Helix in Docker"
linkTitle: Docker
description: Learn how to deploy Helix with Docker.
weight: 1
aliases:
- /helix/private-deployment/manual-install/
- /helix/private-deployment/docker/
---

This page describes how to install Helix on a machine with Docker.

## Requirements

{{< include "requirements.md" >}}

## Deploying the Control Plane

This section describes how to install the control plane using Docker.

### 1. Clone the Repository

Clone the Helix repository and checkout the most recent tag.

```
git clone https://github.com/helixml/helix
cd helix
```

### 2. Configure the `.env` File

We provide an example `.env` file to configure your control plane.

```
cp .env.example-prod .env
```

Now edit `.env` with the editor of your choice.

### 3. Start the Control Plane

Start the stack:
```
docker compose up -d
```

The stack might take a minute to boot up. Check `docker logs -f helix-api-1` and `docker logs -f helix-keycloak-1` for progress. It's normal for the API to retry connecting to keycloak until keycloak comes up. When the API logs:
```
2024-05-08T06:26:28Z INF app/api/cmd/helix/serve.go:288 > Helix server listening on 0.0.0.0:80
```
You will be ready to proceed to the next step.

### 4. Browse to the UI

If you are using `SERVER_URL=http://localhost:8080` and `KEYCLOAK_FRONTEND_URL=http://localhost:8080/auth/` in your `.env` file, you can now load `http://localhost:8080` in your browser. View the [user documentation](/helix/using-helix/_index.md) to learn how to use the Helix UI.

### (Optional) Using an external LLM provider

{{< include "configure-external-provider.md" >}}

### (Optional) Using a real DNS hostname with TLS termination

{{< include "configure-caddy.md" >}}

### (Optional) Enabling Helix Apps

{{< include "configure-apps.md" >}}

### (Optional) Securing Helix

{{< include "configure-security.md" >}}

### Upgrading the Control Plane

Check configuration:

```
cd helix
git pull
```

Open `.env.example-prod` and compare it to your current `.env` to check whether there are any new or changed configuration requirements.

Deploy the upgrade:

```
docker compose pull
docker compose up -d --remove-orphans
```

You can also `git checkout` a specific release tag, but beware that the `docker-compose.yaml` file uses `:latest` tag - update these tags if you want to run an older or pinned version.

## Deploying a Runner

This section describes how to install a Helix runner on Docker.

Select which container image you will use. Get `<LATEST_TAG>` from [https://github.com/helixml/helix/releases](https://github.com/helixml/helix/releases). The tag is in the form `X.Y.Z`. Then add a `-small` or `-large` suffix to the image name to get pre-baked models. You use `X.Y.Z-small` to use an image with Llama3-8B and Phi3-Mini pre-baked (`llama3:instruct,phi3:instruct`), or `X.Y.Z-large` for one with [all our supported Ollama models](https://docs.helix.ml/helix/models/models/) pre-baked.

```
sudo docker run --privileged --gpus all --shm-size=10g \
    --restart=always -d \
    --name helix-runner --ipc=host --ulimit memlock=-1 \
    --ulimit stack=67108864 \
    -v ${HOME}/.cache/huggingface:/root/.cache/huggingface \
    -e RUNTIME_OLLAMA_WARMUP_MODELS=llama3:instruct,phi3:instruct \
    registry.helix.ml/helix/runner:<LATEST_TAG> \
    --api-host <http(s)://YOUR_CONTROLPLANE_HOSTNAME> --api-token <RUNNER_TOKEN_FROM_ENV> \
    --runner-id $(hostname) \
    --memory <GPU_MEMORY>GB \
    --allow-multiple-copies
```

### Configuring a Runner

{{< include "configure-runner.md" >}}

### Upgrading the Runner

```
docker rm -f helix-runner
```

Then run the command above, updating `<LATEST_TAG>` accordingly.
