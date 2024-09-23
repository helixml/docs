---
title: Installing Helix on Kubernetes with Helm
linkTitle: Kubernetes - Helm
description:
weight: 2
aliases:
  - /docs/helix-k8s
  - /docs/helix-runnner-k8s
  - /helix/private-deployment/helix-controlplane-helm-chart/
  - /helix/private-deployment/helix-runner-helm-chart/
---

This page describes how to install Helix on Kubernetes.

## Requirements

{{< include "requirements.md" >}}

{{< warn >}}
The Helm chart does NOT work on [Docker Desktop Kubernetes](https://docs.docker.com/desktop/kubernetes/). Please use [kind](https://kind.sigs.k8s.io/), [minikube](https://minikube.sigs.k8s.io/docs/) or an official Kubernetes cluster.
{{< /warn >}}

## Deploying the Control Plane

This section details how to install the Helix control plane.

There is an [example script in the repository](https://github.com/helixml/helix/blob/main/scripts/kind_helm_install.sh) that shows you an example of deploying the control plane to a kind cluster.

### 1. Install Keycloak

Helix uses Keycloak for authentication. If you have one already, you can skip this step. Otherwise, to install one through Helm ([chart info](https://bitnami.com/stack/keycloak/helm), [repo](https://github.com/bitnami/charts/tree/main/bitnami/keycloak/#installing-the-chart)).

For example:

```bash
helm upgrade --install keycloak oci://registry-1.docker.io/bitnamicharts/keycloak \
  --set auth.adminUser=admin \
  --set auth.adminPassword=oh-hallo-insecure-password \
  --set httpRelativePath="/auth/" \
  --set image.tag="23"
```

By default it only has ClusterIP service, in order to expose it, you can either port-forward or create a load balancer to access it if you are on k3s or minikube:

```
kubectl expose pod keycloak-0 --port 8888 --target-port 8080 --name keycloak-ext --type=LoadBalancer
```

Alternatively, if you run on k3s:

```
helm upgrade --install keycloak oci://registry-1.docker.io/bitnamicharts/keycloak \
  --set auth.adminUser=admin \
  --set auth.adminPassword=oh-hallo-insecure-password \
  --set httpRelativePath="/auth/" \
  --set service.type=LoadBalancer \
  --set service.ports.http=8888
```

### 2. Install the Helm Repository

```bash
helm repo add helix https://charts.helix.ml 
helm repo update
```

### 3. Apply the Chart

Copy the [values-example.yaml from the repository](https://github.com/helixml/helix/blob/main/charts/helix-controlplane/values-example.yaml) to configure the Helix control plane. You can look at the [configuration documentation](/helix/private-deployment/environment-variables.md) to learn more about what they do.

```bash
curl -o values-example.yaml https://raw.githubusercontent.com/helixml/helix/main/charts/helix-controlplane/values-example.yaml
```

You **must** edit the provider configuration in this file so that Helix can run. Specifying a remote provider (e.g. `openai` or `togetherai`) is the easiest, but you must provide API keys to do that. A `helix` provider ensures local operation but then you must also add a runner.

Now you're ready to install the control plane helm chart with the latest images.

```bash
export LATEST_RELEASE=$(curl -s https://get.helix.ml/latest.txt)
helm upgrade --install my-helix-controlplane helix/helix-controlplane \
  -f values-example.yaml \
  --set image.tag="${LATEST_RELEASE}"
```

Ensure all the pods start. If they do not inspect the logs.

Once they are all running, access the control plane via port-forwarding (default) or according to your configuration.

You can configure the Kubernetes deployment by [overriding the settings in the values.yaml](https://github.com/helixml/helix/blob/main/charts/helix-controlplane/values.yaml).

## Deploying a Runner

This section describes how to install a Helix runner on Kubernetes.

### 1. Install the Helm Repository

```bash
helm repo add helix https://charts.helix.ml 
helm repo update
```

### 2. Apply the Chart

Then, install the runner:

```bash
export LATEST_RELEASE=$(curl -s https://get.helix.ml/latest.txt)
helm upgrade --install my-helix-runner helix/helix-runner \
  --set runner.host="my-helix-controlplane" \
  --set runner.token="oh-hallo-insecure-token" \
  --set runner.memory=24GB \
  --set replicaCount=1 \
  --set image.tag="${LATEST_RELEASE}-small"
```

## More Help

If you get stuck, [please get in touch](/helix/help/index.md). But here's some extra links to help you get deployed:

- [Example kind installation bash script](https://github.com/helixml/helix/blob/main/scripts/kind_helm_install.sh)
- [Control plane Helm configuration](https://github.com/helixml/helix/blob/main/charts/helix-controlplane/values.yaml)
- [Helix configuration](https://github.com/helixml/helix/blob/main/charts/helix-controlplane/values-example.yaml)
