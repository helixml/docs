---
title: SUSE Rancher and RKE2
linkTitle: SUSE Rancher and RKE2
description:
weight: 3
aliases:
  - /helix/private-deployment/manual-install/suse-rancher-and-rke2/
---

# Installing Helix on Kubernetes with SUSE Rancher and RKE2

This guide describes how to install Helix on Kubernetes using SUSE Rancher and RKE2.

## Requirements

### Control Plane 
The Helix Control Plane provides the API, web interface, and postgres database and requires:

- Linux, macOS or Windows
- Docker
- 4 CPUs, 8GB RAM and 50GB+ free disk space
- License key from [https://deploy.helix.ml/licenses](https://deploy.helix.ml/licenses)

### Inference Provider requires ONE OF:

- An NVIDIA GPU if you want to use private Helix Runners (example), or
- Ollama running locally on macOS, Linux or Windows (example), or
- An OpenAI-compatible API provider, such as TogetherAI (example) - we like TogetherAI because you can run the same open source models via their API that you can run locally using Helix GPU Runners, but you can use any OpenAI-compatible API (e.g. vLLM, Azure OpenAI, Gemini etc)

### Private Helix Runners require:

- As much system memory as you have GPU memory
- Min 8GB GPU for small models (Llama3-8B, Phi3-Mini), 24GB for Mixtral/SDXL, 40GB for Llama3-70B
- Min 24GB GPU for fine-tuning (text or image)
- Recommend 2x24GB GPUs for e.g. text & image inference in parallel
- NVIDIA 3090s, A6000s are typically good price/performance
- 150GB+ of free disk space
- A fast internet connection (small runner image is 23GB)

## Prerequisites

- [SUSE Rancher](https://ranchermanager.docs.rancher.com/pages-for-subheaders/install-upgrade-on-a-kubernetes-cluster) installed and configured
- RKE2 Kubernetes cluster deployed via SUSE Rancher (follow the [official SUSE Rancher documentation](https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/launch-kubernetes-with-rancher/rke2-for-rancher) to set up an RKE2 cluster)
- Helm CLI installed on your workstation
- `kubectl` configured to access your RKE2 cluster

> **Note:** This guide has been validated with SUSE Rancher v2.7.5+ and RKE2 v1.25.x+. Using earlier versions may result in unexpected behavior.

## Deploying the Control Plane

This section details how to install the Helix control plane on an RKE2 cluster.

### 1. Install Keycloak

Helix uses Keycloak for authentication. If you have one already, you can skip this step. Otherwise, install one through Helm:

```bash
helm upgrade --install keycloak oci://registry-1.docker.io/bitnamicharts/keycloak \
  --version "24.3.1" \
  --set image.tag="23.0.7" \
  --set auth.adminUser=admin \
  --set auth.adminPassword=oh-hallo-insecure-password \
  --set httpRelativePath="/auth/"
```

Note: These are pinned versions that have been tested and are known to work. Newer versions may work, but they have not been tested with Helix.

You do not need to expose a service to access Keycloak from outside the cluster - it is used as an internal implementation detail of Helix (and Helix manages the helix Keycloak realm via admin access).

### 2. Configure NVIDIA GPU Operator (if using GPU nodes)

If you're planning to use GPU nodes for Helix Runners, install the NVIDIA GPU Operator on your RKE2 cluster:

```bash
# Add the NVIDIA Helm repository
helm repo add nvidia https://helm.ngc.nvidia.com/nvidia
helm repo update

# Install the GPU Operator
helm install --wait --generate-name \
  -n gpu-operator --create-namespace \
  nvidia/gpu-operator
```

### 3. Install the Helix Helm Repository

```bash
helm repo add helix https://charts.helixml.tech
helm repo update
```

### 4. Apply the Helix Control Plane Chart

Download the example values file to configure the Helix control plane:

```bash
curl -o values-example.yaml https://raw.githubusercontent.com/helixml/helix/main/charts/helix-controlplane/values-example.yaml
```

Edit the `values-example.yaml` file to configure providers and other settings for your RKE2 environment. At minimum, you must edit:
- the provider configuration so that Helix can run.
- the license key (from [https://deploy.helix.ml/licenses](https://deploy.helix.ml/licenses)).

Now install the control plane Helm chart with the latest images:

```bash
export LATEST_RELEASE=$(curl -s https://get.helixml.tech/latest.txt)
helm upgrade --install my-helix-controlplane helix/helix-controlplane \
  -f values-example.yaml \
  --set image.tag="${LATEST_RELEASE}"
```

### 5. Configure Ingress with SUSE Rancher

RKE2 includes Traefik as the default ingress controller. To expose the Helix Control Plane using Traefik:

Add the following to your `values-example.yaml` file:

```yaml
ingress:
  enabled: true
  className: "traefik"
  annotations:
    traefik.ingress.kubernetes.io/router.entrypoints: web, websecure
  hosts:
    - host: helix.your-domain.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: helix-tls
      hosts:
        - helix.your-domain.com
```

Alternatively, you can use the SUSE Rancher UI to configure the ingress:

1. Navigate to your cluster in the SUSE Rancher UI
2. Go to **Service Discovery** > **Ingresses**
3. Click **Create**
4. Configure the ingress pointing to the `my-helix-controlplane` service on port 80
5. Set up TLS if needed

## Deploying a Runner

This section describes how to install a Helix runner on your RKE2 cluster.

### 1. Ensure your GPU nodes are properly labeled

If using GPU nodes for runners, ensure they have the correct labels:

```bash
kubectl label nodes <your-gpu-node> accelerator=nvidia
```

### 2. Install the Helix Runner Chart

```bash
export LATEST_RELEASE=$(curl -s https://get.helixml.tech/latest.txt)
helm upgrade --install my-helix-runner helix/helix-runner \
  --set runner.host="my-helix-controlplane" \
  --set runner.token="oh-hallo-insecure-token" \
  --set runner.memory=24GB \
  --set replicaCount=1 \
  --set image.tag="${LATEST_RELEASE}-small" \
  --set nodeSelector.accelerator=nvidia
```

### 3. Verify Runner Connection

Check the runner logs to ensure it connects to the control plane:

```bash
kubectl logs -l app.kubernetes.io/name=helix-runner
```

## Monitoring with SUSE Rancher

SUSE Rancher provides built-in monitoring tools that can be enabled for your RKE2 cluster:

1. In the SUSE Rancher UI, navigate to your cluster
2. Go to **Apps**
3. Install the **Monitoring** app
4. Once installed, you can access Grafana and Prometheus dashboards from the SUSE Rancher UI

## Troubleshooting

### Common Issues

1. **GPU not detected by runner pods**:
   - Verify GPU operator installation: `kubectl get pods -n gpu-operator`
   - Check NVIDIA driver pods are running: `kubectl get pods -n gpu-operator-resources`
   - Validate device plugin: `kubectl describe node <gpu-node> | grep -i nvidia`

2. **Control plane unable to reach Keycloak**:
   - Check Keycloak pods: `kubectl get pods | grep keycloak`
   - Examine Keycloak logs: `kubectl logs <keycloak-pod-name>`

3. **Runner can't connect to control plane**:
   - Ensure the runner.host is correctly set to the control plane service name
   - Verify the runner token matches what's configured in the control plane

For more detailed assistance, check the Helix logs or contact Helix support.
