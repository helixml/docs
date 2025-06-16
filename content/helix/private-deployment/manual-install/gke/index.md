---
title: Installing Helix on GKE with Helm
linkTitle: GKE - Helm
description: Discover how to deploy Helix on GKE with Terraform and Helm
weight: 4
---

The following demonstrates how to deploy Helix on GKE using Terraform and Helm.

## Prerequisites

* Install `terraform`

```
brew install terraform
```

* Install `google-cloud-sdk` to get the `gcloud` CLI

```
brew install --cask google-cloud-sdk
```

* Ensure you have sufficient quota for an `L4` GPU. See the [GCP docs for more details](https://cloud.google.com/kubernetes-engine/docs/how-to/gpus#gpu_quota).

## Setup

1. Clone this repository and cd into the directory:

```
git clone https://github.com/helixml/terraform-gke-helix.git
cd terraform-gke-helix
```

2. Log into GCP:

```
gcloud init
gcloud auth application-default login
```

3. Edit the configuration in the `terraform.tfvars` file to match your account.
4. Initialize the Terraform workspace:

```
terraform init
```

## Provision

Now deploy the infra.

```
terraform apply
```

## Configure Kubectl

```
gcloud container clusters get-credentials $(terraform output -raw kubernetes_cluster_name) --region $(terraform output -raw region) --project $(terraform output -raw project_id)
```

You may need to install [gke-gcloud-auth-plugin](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#install_plugin) to gain access to the cluster.

## Install Helix

Now you're ready to install Helix.

### 1. Install Keycloak

{{< include "helm-keycloak.md" >}}


### 2. Install the Helm Repository

{{< include "helm-repo.md" >}}

### 3. Apply the Chart

{{< include "helm-controlplane.md" >}}

### 4. Deploying a Runner

Here is some useful information when you configure the runner:

* the default GPU type in the `terraform.tfvars` is an L4 with 24GB GPU ram. So `--set runner.memory=24GB`.
* by default there's a single node with a GPU. So install everything on the same node (no selector) and `--set replicaCount=1`

For example:

```bash
export LATEST_RELEASE=$(curl -s https://get.helixml.tech/latest.txt)
helm upgrade --install my-helix-runner helix/helix-runner \
  --set runner.host="http://my-helix-controlplane" \
  --set runner.token="oh-hallo-insecure-token" \
  --set runner.memory=24GB \
  --set replicaCount=1 \
  --set runner.axolotl="false" \
  --set image.tag="${LATEST_RELEASE}-small"
```

If you want to schedule the runner to run on certain nodes, then please set the `nodeSelector`. Change the label to match the value shown in the output of `kubectl describe node`.

```bash
  --set nodeSelector."nvidia\.com/gpu\.product"="NVIDIA-A100-SXM4-40GB"
```

## Access Helix

The default kubernetes installation is locked down. You can access Helix via port-forwarding from your machine.

```
kubectl port-forward svc/my-helix-controlplane 8080:80
```

And visit: [http://localhost:8080/](http://localhost:8080/)

Take a look at the [user documentation](/helix/getting-started/getting-started/index.md) to learn how to use Helix.

## Delete the Cluster

```
terraform destroy
```
