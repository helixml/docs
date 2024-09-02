---
title: "Advanced: Manually Deploying Helix in Docker"
description:
weight: 10
aliases:
  - /docs/controlplane
---

## Architecture

See [Architecture](/docs/architecture) to understand how the control plane fits in.

## Deployment on Docker Compose

**Requires:** x86_64 architecture, [docker](https://docs.docker.com/engine/install/). On Windows, [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)

* 4 CPUs, 8GB RAM and 512GB disk on control plane
* As much system memory as you have GPU memory on runners
* Min 256GB disk space (recommended 512GB+) on control plane and runners
* Min 8GB GPU for small models (Llama3-8B, Phi3-Mini), 24GB for Mixtral/SDXL, 40GB for Llama3-70B
* Min 24GB GPU for fine-tuning (text or image)
* Recommend 2x24GB GPUs for e.g. text & image inference in parallel
* NVIDIA 3090s, A6000s are typically good price/performance

### Clone repo and set up env file

```
git clone https://github.com/helixml/helix
cd helix
cp .env.example-prod .env
```
Now edit `.env` with the editor of your choice.

If you just want to test locally, you can set:
```
KEYCLOAK_FRONTEND_URL=http://localhost:8080/auth/
SERVER_URL=http://localhost:8080
```
If you're using a real DNS hostname for your deployment, set:
```
KEYCLOAK_FRONTEND_URL=https://<YOUR_CONTROLPLANE_HOSTNAME>/auth/
SERVER_URL=https://<YOUR_CONTROLPLANE_HOSTNAME>
```
Where `<YOUR_CONTROLPLANE_HOSTNAME>` is a DNS A record that points to the IP address of your server. Ensure ports 443 and 80 are not firewalled.
In this case, we'll set up easy TLS termination shortly.

### Start the stack

Start the stack:
```
docker compose up -d
```

The stack might take a minute to boot up. Check `docker logs -f helix-api-1` and `docker logs -f helix-keycloak-1` for progress. It's normal for the API to retry connecting to keycloak until keycloak comes up. When the API logs:
```
2024-05-08T06:26:28Z INF app/api/cmd/helix/serve.go:288 > Helix server listening on 0.0.0.0:80
```
You will be ready to proceed to the next step.


#### Testing on localhost

If you are using `SERVER_URL=http://localhost:8080` and `KEYCLOAK_FRONTEND_URL=http://localhost:8080/auth/` in your `.env` file, you can now load `http://localhost:8080` in your browser.

#### Using a real DNS hostname with TLS termination

If you're using a non-localhost domain, you'll need to point a DNS hostname (A record) at the IP address of your server and set up TLS termination.

Set up [caddy](https://caddyserver.com/docs/install#debian-ubuntu-raspbian) or another TLS-terminating proxy of your choice. Here is an example `Caddyfile`:
```
<YOUR_CONTROLPLANE_HOSTNAME>

reverse_proxy :8080
```
```
sudo caddy reload
```

Then load `https://<YOUR_CONTROLPLANE_HOSTNAME>` in your browser. Caddy will automatically provision TLS certificates.

Ensure you are using `https` URLs for `KEYCLOAK_FRONTEND_URL` and `SERVER_URL` in your controlplane `.env` file.

### Locking down the stack

By default, new registrations are enabled to make it easy for you to create an account. Also by default, all accounts are admin accounts.

After creating your own accounts, you can choose to disable new registrations. Go to `http(s)://<YOUR_CONTROLPLANE_HOSTNAME>/auth` and click "Administration Console". Log in with `admin` and `KEYCLOAK_ADMIN_PASSWORD` from your `.env` file. Click the "master" dropdown and switch to the helix realm. Under "Realm settings" -> "Login", you can untick "User registration". You can also set up OAuth, email validation etc here.

To lock down admin users to a specific set of users, go to Users in Keycloak and find the users you want to be admins. Copy their IDs into `.env` as a comma-separated list under `ADMIN_USER_IDS` variable. Run `docker compose up -d` to update the stack.

You may also wish to review all available configuration options in <a href="https://docs.helix.ml/helix/private-deployment/environment-variables/" target="_self">Environment Variables</a>.

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

On Kubernetes, and for a deployment with pinned versions, check out the [Helm charts on Kubernetes](/helix/private-deployment/helix-controlplane-helm-chart/).


### Version-specific upgrade notes

* Upgrading from < 0.6 to >= 0.6 - [Keycloak upgrade requires a manual user database export / import](https://github.com/helixml/helix/blob/main/UPGRADING.md#from-helix--060-to-helix--060)

## Using an external LLM provider

If you don't want to attach your own GPUs to run models locally, you can specify an external OpenAI-compatible LLM provider. On the controlplane `.env` simply add:

```
INFERENCE_PROVIDER=openai
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=<any OpenAI compatible API>
```

The frontend will automatically list models available on the LLM provider. You can also specify any model name supported by the provider in a [helix app yaml](/helix/develop/getting-started/) with the `model` field on an assistant.

Alternatively, you can attach a GPU runner as described in the following section.

Apps, RAG and API calling for text inference all work with external LLM providers. If you want image inference, or text or image fine tuning, you need to attach your own GPU runners.

## Attaching a runner

**Requires:** x86_64 architecture, Linux and NVIDIA

Ensure you have the [NVIDIA docker toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) installed.

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

Notes:

* You can update `RUNTIME_OLLAMA_WARMUP_MODELS` to match the specific Ollama models you want to enable for your Helix install, see [available values](https://docs.helix.ml/helix/models/models/).
* Helix will download the weights for models specified in `RUNTIME_OLLAMA_WARMUP_MODELS` at startup if they are not baked into the image. This can be slow, especially if it runs in parallel across many runners, and can easily saturate your network connection. This is why using the images with pre-baked weights (`-small` and `-large` variants) is recommended.
* Warning: the `-large` image is large (over 100GB), but it saves you re-downloading the weights every time the container restarts! We recommend using `X.Y.Z-small` and setting the `RUNTIME_OLLAMA_WARMUP_MODELS` value to `llama3:instruct,phi3:instruct` to get started, so the download isn't too big. If you want to use other models in the Helix UI and API, delete this `-e RUNTIME_OLLAMA_WARMUP_MODELS` line from below, and it will use the defaults (all models). The default models will take a long time to download!
* Update `<GPU_MEMORY>` to correspond to how much GPU memory you have, e.g. "80GB" or "24GB"
* You can add `--gpus 1` before the image name to target a specific GPU on the system (starting at 0). If you want to use multiple GPUs on a node, you'll need to run multiple runner containers (in that case, remember to give them different names)
* Make sure to run the container with `--restart always` or equivalent in your container runtime, since the runner will exit if it detects an unrecoverable error and should be restarted automatically
* If you want to run the runner on the same machine as the controlplane, either: (a) set `--network host` and set `--api-host http://localhost:8080` so that the runner can connect on localhost via the exposed port, or (b) use `--api-host http://172.17.0.1:8080` so that the runner can connect to the API server via the docker bridge IP. On Windows or Mac, you can use `--api-host http://host.docker.internal:8080`
* Helix will currently also download and run SDXL and Mistral-7B weights used for fine-tuning at startup. These weights are not currently pre-baked anywhere. This can be disabled with `RUNTIME_AXOLOTL_ENABLED=false` if desired. If running in a low-memory environment, this may cause CUDA OOM errors at startup, which can be ignored (at startup) since the scheduler will only fit models into available memory after the startup phase.
* If you want to use text fine-tuning, you need to set the environment variable `HF_TOKEN` to a valid Huggingface token, then you now need to accept sharing your contact information with Mistral [here](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1) and then fetch an access token from [here](https://huggingface.co/settings/tokens) and then specify it in this environment variable.

### Runner upgrades

```
docker rm -f helix-runner
```

Then run the command above, updating `<LATEST_TAG>` accordingly.

## Enabling Helix Apps

Helix Apps are a fun new way to define LLM applications as code (LLMGitOps!?). Your users can create `helix.yaml` configuration files that tell Helix what tools it has access to (e.g. APIs) and what scripts it can run (e.g. GPTScript).

To enable this you need to provide some extra configuration and create a Github App to request access to a user's repository.

### 1. Create a Github OAuth App

1. Browse to your Github Organization's Settings page then at the bottom left navigation bar click `Developer Settings` -> `OAuth Apps`. This is an example URL for the helixml org: `https://github.com/organizations/helixml/settings/applications`. If you can't see the settings page you probably don't have permission. You can also try [creating a personal Oauth App](https://github.com/settings/applications/new) instead.

2. Create an informative name and set the homepage URL to your domain. Finally set the `Authorization callback URL` to: `https://YOUR_DOMAIN/api/v1/github/callback`. This url must be publically accessible from Github's servers.

    You can test if it is publically accessible with: `curl https://YOUR_DOMAIN/api/v1/github/callback -i`. You should see a 401 error. If it produces a DNS error, a time out, or a 404, then your control plane has not been setup correctly.

3. Now that the app has been created, click on the `Create a new client secret` button. Make a note of the `Client ID` and `Client secret`.

### 2. Enable Github Apps in Helix Configuration

1. Browse to your Helix installation directory and edit the `.env` file.

2. Add the following lines to your `.env` file:

```txt
GITHUB_INTEGRATION_ENABLED=true
GITHUB_INTEGRATION_CLIENT_ID=XXX
GITHUB_INTEGRATION_CLIENT_SECRET=XXX
GITHUB_INTEGRATION_WEBHOOK_URL=https://YOUR_DOMAIN/api/v1/github/webhook
```

### 3. Restart the Helix Control Plane

Restart helix with `docker compose up -d`. This will recreate the control plane container.

### 4. Test Helix Apps

Now go ahead and browse to `https://YOUR_DOMAIN/apps` and click on `NEW APP` at the top right. You should be able to connect to and add a repository that you are a maintainer/owner of.

## Questions? Bugs?

Come find us on [Discord](https://discord.gg/VJftd844GE).
