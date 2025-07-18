Use the license key from the [license manager](https://deploy.helix.ml/licenses) and create a secret with the contents:

```bash
kubectl create \
    secret generic helix-license \
    --from-literal=license="<base64 encoded secret contents here>"
```

Copy the [values-example.yaml from the repository](https://github.com/helixml/helix/blob/main/charts/helix-controlplane/values-example.yaml) to configure the Helix control plane. You can look at the [configuration documentation](/helix/private-deployment/environment-variables.md) to learn more about what they do.

```bash
curl -o values-example.yaml https://raw.githubusercontent.com/helixml/helix/main/charts/helix-controlplane/values-example.yaml
```

You **must** edit the provider configuration in this file so that Helix can run. Specifying a remote provider (e.g. `openai` or `togetherai`) is the easiest, but you must provide API keys to do that. A `helix` provider ensures local operation but then you must also add a runner.

Now you're ready to install the control plane helm chart with the latest images.

```bash
export LATEST_RELEASE=$(curl -s https://get.helixml.tech/latest.txt)

helm upgrade --install my-helix-controlplane helix/helix-controlplane \
  -f values-example.yaml \
  --set image.tag="${LATEST_RELEASE}"
```

Ensure all the pods start. If they do not inspect the logs.

Once they are all running, access the control plane via port-forwarding (default) or according to your configuration, for example:

```bash
kubectl port-forward svc/helix-helix-controlplane 8080:80
```

You can configure the Kubernetes deployment by [overriding the settings in the values.yaml](https://github.com/helixml/helix/blob/main/charts/helix-controlplane/values.yaml).


#### Database Configuration

Helix requires PostgreSQL for application data and optionally PostgreSQL with the PGVector extension for RAG (Retrieval-Augmented Generation) functionality. You can use vanilla PostgreSQL for the main database and PostgreSQL with the PGVector extension for vectors. Both configurations support bundled deployment or external connection with comprehensive secret support.

##### PostgreSQL Configuration

**Bundled PostgreSQL (default)**:

```yaml
postgresql:
  enabled: true
  auth:
    username: helix
    password: "secure-password"
    database: helix
    # Optional: Use existing secret
    # existingSecret: "postgresql-auth-secret"
    # usernameKey: "username"      # defaults to "username"
    # passwordKey: "password"      # defaults to "password"
    # databaseKey: "database"      # defaults to "database"
```

**External PostgreSQL**:

```yaml
postgresql:
  enabled: false
  external:
    host: "my-postgres.example.com"
    port: 5432
    user: "helix"
    password: "secure-password"
    database: "helix"
    # Optional: Use existing secret
    # existingSecret: "postgresql-external-secret"
    # existingSecretHostKey: "host"
    # existingSecretUserKey: "user"
    # existingSecretPasswordKey: "password"
    # existingSecretDatabaseKey: "database"
```

##### PostgreSQL with PGVector Extension Configuration (for RAG)

**Bundled PostgreSQL with PGVector**:

```yaml
pgvector:
  enabled: true
  auth:
    username: postgres
    password: "secure-password"
    database: postgres
    # Optional: Use existing secret
    # existingSecret: "pgvector-auth-secret"
    # usernameKey: "username"      # defaults to "username"
    # passwordKey: "password"      # defaults to "password"
    # databaseKey: "database"      # defaults to "database"
```

**External PostgreSQL with PGVector**:

```yaml
pgvector:
  enabled: false
  external:
    host: "my-pgvector.example.com"
    port: 5432
    user: "postgres"
    password: "secure-password"
    database: "postgres"
    # Optional: Use existing secret
    # existingSecret: "pgvector-external-secret"
    # existingSecretHostKey: "host"
    # existingSecretUserKey: "user"
    # existingSecretPasswordKey: "password"
    # existingSecretDatabaseKey: "database"
```

**Important**: External PostgreSQL with PGVector must have the `vector`, `vectorchord`, and `vectorchord-bm25` extensions installed. The bundled PostgreSQL with PGVector uses an image which includes all required extensions.

#### Database Secrets Management

For production deployments, use Kubernetes secrets instead of plain text passwords:

```bash
# Create PostgreSQL secret
kubectl create secret generic postgresql-auth-secret \
  --from-literal=username=helix \
  --from-literal=password=secure-password \
  --from-literal=database=helix

# Create PostgreSQL with PGVector secret  
kubectl create secret generic pgvector-auth-secret \
  --from-literal=username=postgres \
  --from-literal=password=secure-password \
  --from-literal=database=postgres

# Create controlplane secrets
kubectl create secret generic runner-token-secret \
  --from-literal=token=your-secure-runner-token-here

kubectl create secret generic keycloak-auth-secret \
  --from-literal=user=admin \
  --from-literal=password=your-secure-keycloak-admin-password

# Create provider API key secrets
kubectl create secret generic openai-credentials \
  --from-literal=api-key=sk-your-openai-api-key

kubectl create secret generic anthropic-credentials \
  --from-literal=api-key=sk-ant-your-anthropic-api-key

kubectl create secret generic together-credentials \
  --from-literal=api-key=your-together-api-key

kubectl create secret generic vllm-credentials \
  --from-literal=api-key=your-vllm-api-key
```
