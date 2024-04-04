---
title: Deploying the Helix Controlplane
description:
weight: 1
aliases:
  - /docs/controlplane
---

## Architecture

See [Architecture](/docs/architecture) to understand how the control plane fits in.

## Deployment on Docker Compose

**Requires:** x86_64 architecture

```
git clone https://github.com/helixml/helix
cd helix
git checkout 0.6.9
cp .env.example-prod .env
```
Now edit `.env` with the editor of your choice.
```
docker-compose up -d
```

You'll want to point a DNS hostname at the IP address of your server.

Then load `http://<YOUR_CONTROLPLANE_HOSTNAME>` in your browser (the app runs on port 80).

### Upgrades

Check configuration:
```
cd helix
git pull
git checkout 0.6.9
```
Open `.env.example-prod` and compare it to your current `.env` to check whether there are any new or changed configuration requirements.

Deploy the upgrade:
```
docker-compose pull
docker-compose up -d --remove-orphans
```

### Version-specific upgrade notes

* Upgrading from < 0.6 to >= 0.6 - [Keycloak upgrade requires a manual user database export / import](https://github.com/helixml/helix/blob/main/UPGRADING.md#from-helix--060-to-helix--060)

## Attaching a runner

**Requires:** x86_64 architecture, Linux and NVIDIA

Ensure you have the [NVIDIA docker toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) installed.

```
sudo docker run --privileged --gpus all --shm-size=10g \
    --restart=always -d \
    --name helix-runner --ipc=host --ulimit memlock=-1 \
    --ulimit stack=67108864 \
    -v ${HOME}/.cache/huggingface:/root/.cache/huggingface \
    europe-docker.pkg.dev/helixml/helix/runner:0.6.2 \
    --api-host <http(s)://YOUR_CONTROLPLANE_HOSTNAME> --api-token <RUNNER_TOKEN_FROM_ENV> \
    --runner-id $(hostname) \
    --memory <GPU_MEMORY>GB \
    --allow-multiple-copies
```

Notes:

* Update `<GPU_MEMORY>` to correspond to how much GPU memory you have, e.g. "80GB" or "24GB"
* You can add `--gpus 1` before the image name to target a specific GPU on the system (starting at 0). If you want to use multiple GPUs on a node, you'll need to run multiple runner containers (in that case, remember to give them different names)
* Make sure to run the container with `--restart always` or equivalent in your container runtime, since the runner will exit if it detects an unrecoverable error and should be restarted automatically
* If you want to run the runner on the same machine as the controlplane, either: (a) set `--network host` and set `--api-host http://localhost` so that the runner can connect on localhost via the exposed port, or (b) use `--api-host http://172.17.0.1` so that the runner can connect to the API server via the docker bridge IP

### Runner upgrades

```
docker rm -f helix-runner
```

Then run the command above.

## Questions? Bugs?

Come find us on [Discord](https://discord.gg/VJftd844GE).
