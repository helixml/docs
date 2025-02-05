Helix uses Keycloak for authentication. If you have one already, you can skip this step. Otherwise, to install one through Helm ([chart info](https://bitnami.com/stack/keycloak/helm), [repo](https://github.com/bitnami/charts/tree/main/bitnami/keycloak/#installing-the-chart)).

For example:

```bash
helm upgrade --install keycloak oci://registry-1.docker.io/bitnamicharts/keycloak \
  --version "24.3.1" \
  --set image.tag="23.0.7" \
  --set auth.adminUser=admin \
  --set auth.adminPassword=oh-hallo-insecure-password \
  --set httpRelativePath="/auth/"
```

Note the pinned version of the chart and the image tag. These are versions that we have tested and are known to work. Newer versions may work, but we have not tested them. [Raise an issue if you have any issues.](https://github.com/helixml/helix/issues)

You do not need to expose a service to access Keycloak from outside the cluster - it is used as an internal implementation detail of Helix (and Helix manages the `helix` Keycloak realm via admin access).
