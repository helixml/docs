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

### 1. Install the Helm Repository

{{< include "helm-repo.md" >}}

### 2. Apply the Chart

{{< include "helm-controlplane.md" >}}

## Deploying a Runner

This section describes how to install a Helix runner on Kubernetes.

### 1. Install the Helm Repository

{{< include "helm-repo.md" >}}

### 2. Apply the Chart

Then, install the runner:

```bash
export LATEST_RELEASE=$(curl -s https://get.helixml.tech/latest.txt)
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
