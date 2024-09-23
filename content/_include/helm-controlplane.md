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