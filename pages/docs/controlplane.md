---
title: Deploying the Helix Controlplane
description:
---

# {% $markdoc.frontmatter.title %}

## Architecture

See [Architecture](/docs/architecture) to understand how the control plane fits in.

## Deployment on Docker Compose

```
git clone https://github.com/helixml/helix
cd helix
cp .env.example-prod .env
```
Now edit `.env` with the editor of your choice.
```
docker-compose up --build -d
```

## Attaching a runner

Ensure you have the [NVIDIA docker toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) installed.

```
sudo docker run --privileged --gpus all --shm-size=10g \
    --restart=always -d \
    --name helix-runner --ipc=host --ulimit memlock=-1 \
    --ulimit stack=67108864 \
    -v ${HOME}/.cache/huggingface:/root/.cache/huggingface \
    europe-docker.pkg.dev/helixml/helix/runner:v0.2.9 \
    --api-host https://app.tryhelix.ai --api-token <RUNNER_TOKEN_FROM_ENV> \
    --runner-id $(hostname) \
    --memory 40GB \
    --allow-multiple-copies --timeout-seconds 120
```

NOTE: update `memory` to correspond to how much GPU memory you have.

## Questions? Bugs?

Come find us on [Discord](https://discord.gg/VJftd844GE).
