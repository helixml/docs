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

## Deploying the Control Plane

This section details how to install the Helix control plane.

### 1. Install Keycloak

Helix uses Keycloak for authentication. If you have one already, you can skip this step. Otherwise, to install one through Helm ([chart info](https://bitnami.com/stack/keycloak/helm), [repo](https://github.com/bitnami/charts/tree/main/bitnami/keycloak/#installing-the-chart)).

For example:

```bash
helm upgrade --install keycloak oci://registry-1.docker.io/bitnamicharts/keycloak \
  --set auth.adminUser=admin \
  --set auth.adminPassword=oh-hallo-insecure-password \
  --set httpRelativePath="/auth/"
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

## 3. Apply the Chart

Copy the values-example.yaml to values-your-env.yaml and update the values as needed. Then run the following command (just with your own file):

```bash
export LATEST_RELEASE=$(curl -s https://get.helix.ml/repos/helixml/helix/releases/latest | sed -n 's/.*"tag_name": "\(.*\)".*/\1/p')
helm upgrade --install my-helix-controlplane helix/helix-controlplane \
  -f helix-controlplane/values.yaml \
  -f helix-controlplane/values-example.yaml \
  --set image.tag="${LATEST_RELEASE}"
```

Use port-forward to access the service.

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
helm upgrade --install my-helix-runner helix/helix-runner \
  --set runner.host="<host>" \
  --set runner.token="<token>" \
  --set runner.memory=24GB \
  --set replicaCount=4 \
  --set nodeSelector."nvidia\.com/gpu\.product"="NVIDIA-GeForce-RTX-3090-Ti"
```
