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

**Requires:** x86_64 architecture, [docker](https://docs.docker.com/engine/install/). On Windows, [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)

### Clone repo and set up env file

```
git clone https://github.com/helixml/helix
cd helix
cp .env.example-prod .env
```
Now edit `.env` with the editor of your choice.

If you just want to test locally, you can set:
```
KEYCLOAK_FRONTEND_URL=http://localhost/auth/
SERVER_URL=http://localhost
```
Otherwise, set them to:
```
KEYCLOAK_FRONTEND_URL=https://<YOUR_CONTROLPLANE_HOSTNAME>/auth/
SERVER_URL=https://<YOUR_CONTROLPLANE_HOSTNAME>
API_PORT=8080
```
Where `<YOUR_CONTROLPLANE_HOSTNAME>` is a DNS A record that points to the IP address of your server. Ensure ports 443 and 80 are not firewalled.
In this case, we'll set up easy TLS termination shortly.

### Update realm settings

Ensure keycloak realm settings are up to date with your .env file:
```
./update-realm-settings.sh
```
Do this **before** starting the stack for the first time. If you change the `KEYCLOAK_FRONTEND_URL` and/or `SERVER_URL` settings later, you'll have to manually update them in Keycloak in the client settings (see [Locking down the stack](#locking-down-the-stack) for how to log in).

### Start the stack

Start the stack:
```
docker compose up -d
```

### Testing on localhost

If you are using `SERVER_URL=http://localhost` and `KEYCLOAK_FRONTEND_URL=http://localhost/auth/` in your `.env` file, you can now load `http://localhost` in your browser.

### Using a real hostname name with TLS termination

If you're using a non-localhost domain, you'll need to point a DNS hostname (A record) at the IP address of your server and set up TLS termination.

To enable TLS, first set the app to run on a different port to port 80 by setting `API_PORT=8080` in `.env` and running `docker compose up -d` to update the running stack.

Then set up [caddy](https://caddyserver.com/docs/install#debian-ubuntu-raspbian) or another TLS-terminating proxy of your choice. Here is an example `Caddyfile`:
```
<YOUR_CONTROLPLANE_HOSTNAME>

reverse_proxy :8080
```
```
caddy start
```

Then load `https://<YOUR_CONTROLPLANE_HOSTNAME>` in your browser. Caddy will automatically provision TLS certificates.

### Locking down the stack

By default, new registrations are enabled to make it easy for you to create an account. Also by default, all accounts are admin accounts.

After creating your own accounts, you can choose to disable new registrations. Go to `http(s)://<YOUR_CONTROLPLANE_HOSTNAME>/auth` and click "Administration Console". Log in with `admin` and `KEYCLOAK_ADMIN_PASSWORD` from your `.env` file. Click the "master" dropdown and switch to the helix realm. Under "Realm settings" -> "Login", you can untick "User registration". You can also set up OAuth, email validation etc here.

To lock down admin users to a specific set of users, go to Users and find the users you want to be admins. Copy their IDs into `.env` as a comma-separated list under `ADMIN_USER_IDS` variable. Run `docker compose up -d` to update the stack.

### Upgrades

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

On Kubernetes, and for a deployment with pinned versions, check out the [/helix/private-deployment/helix-controlplane-helm-chart/](Helm charts on Kubernetes).


### Version-specific upgrade notes

* Upgrading from < 0.6 to >= 0.6 - [Keycloak upgrade requires a manual user database export / import](https://github.com/helixml/helix/blob/main/UPGRADING.md#from-helix--060-to-helix--060)

## Attaching a runner

**Requires:** x86_64 architecture, Linux and NVIDIA

Ensure you have the [NVIDIA docker toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) installed.

Get `<LATEST_TAG>` from [https://github.com/helixml/helix/releases](https://github.com/helixml/helix/releases). The tag is in the form `X.Y.Z`.

```
sudo docker run --privileged --gpus all --shm-size=10g \
    --restart=always -d \
    --name helix-runner --ipc=host --ulimit memlock=-1 \
    --ulimit stack=67108864 \
    -v ${HOME}/.cache/huggingface:/root/.cache/huggingface \
    europe-docker.pkg.dev/helixml/helix/runner:<LATEST_TAG> \
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

Then run the command above, updating `<LATEST_TAG>` accordingly.

## Questions? Bugs?

Come find us on [Discord](https://discord.gg/VJftd844GE).
