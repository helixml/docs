---
title: Deploying the Helix Controlplane
description:
---

# {% $markdoc.frontmatter.title %}

## Architecture

See [Architecture](/docs/architecture) to understand how the control plane fits in.

## Deployment on Docker Compose

**Requires:** x86_64 architecture

```
git clone https://github.com/helixml/helix
cd helix
git checkout 0.3.8
cp .env.example-prod .env
```
Now edit `.env` with the editor of your choice.
```
docker-compose up --build -d
```

You'll want to point a DNS hostname at the IP address of your server.

Then load `http://<YOUR_CONTROLPLANE_HOSTNAME>` in your browser (the app runs on port 80).


## Attaching a runner

**Requires:** x86_64 architecture, Linux and NVIDIA

Ensure you have the [NVIDIA docker toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) installed.

```
sudo docker run --privileged --gpus all --shm-size=10g \
    --restart=always -d \
    --name helix-runner --ipc=host --ulimit memlock=-1 \
    --ulimit stack=67108864 \
    -v ${HOME}/.cache/huggingface:/root/.cache/huggingface \
    europe-docker.pkg.dev/helixml/helix/runner:0.3.8 \
    --api-host <http(s)://YOUR_CONTROLPLANE_HOSTNAME> --api-token <RUNNER_TOKEN_FROM_ENV> \
    --runner-id $(hostname) \
    --memory 40GB \
    --allow-multiple-copies --timeout-seconds 120
```

Notes:

* Update `memory` to correspond to how much GPU memory you have
* You can add `-e CUDA_VISIBLE_DEVICES=1` before the image name to target a specific GPU on the system. If you want to use multiple GPUs on a node, you'll need to run multiple runner containers (in that case, remember to give them different names)
* Make sure to run the container with `--restart always` or equivalent in your container runtime, since the runner will exit if it detects an unrecoverable error and should be restarted automatically
* If you want to run the runner on the same machine as the controlplane, either: (a) set `--network host` and set `--api-host http://localhost` so that the runner can connect on localhost via the exposed port, or (b) use `--api-host http://172.17.0.1` so that the runner can connect to the API server via the docker bridge IP

## Questions? Bugs?

Come find us on [Discord](https://discord.gg/VJftd844GE).
