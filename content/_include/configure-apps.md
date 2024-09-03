Helix Apps are a fun new way to define LLM applications as code (LLMGitOps!?). Your users can create `helix.yaml` configuration files that tell Helix what tools it has access to (e.g. APIs) and what scripts it can run (e.g. GPTScript).

To enable this you need to provide some extra configuration and create a Github App to request access to a user's repository.

#### 1. Create a Github OAuth App

1. Browse to your Github Organization's Settings page then at the bottom left navigation bar click `Developer Settings` -> `OAuth Apps`. This is an example URL for the helixml org: `https://github.com/organizations/helixml/settings/applications`. If you can't see the settings page you probably don't have permission. You can also try [creating a personal Oauth App](https://github.com/settings/applications/new) instead.

2. Create an informative name and set the homepage URL to your domain. Finally set the `Authorization callback URL` to: `https://YOUR_DOMAIN/api/v1/github/callback`. This url must be publically accessible from Github's servers.

    You can test if it is publically accessible with: `curl https://YOUR_DOMAIN/api/v1/github/callback -i`. You should see a 401 error. If it produces a DNS error, a time out, or a 404, then your control plane has not been setup correctly.

3. Now that the app has been created, click on the `Create a new client secret` button. Make a note of the `Client ID` and `Client secret`.

#### 2. Enable Github Apps in Helix Configuration

1. Browse to your Helix installation directory and edit the `.env` file.

2. Add the following lines to your `.env` file:

```txt
GITHUB_INTEGRATION_ENABLED=true
GITHUB_INTEGRATION_CLIENT_ID=XXX
GITHUB_INTEGRATION_CLIENT_SECRET=XXX
GITHUB_INTEGRATION_WEBHOOK_URL=https://YOUR_DOMAIN/api/v1/github/webhook
```

#### 3. Restart the Helix Control Plane

Restart helix with `docker compose up -d`. This will recreate the control plane container.

#### 4. Test Helix Apps

Now go ahead and browse to `https://YOUR_DOMAIN/apps` and click on `NEW APP` at the top right. You should be able to connect to and add a repository that you are a maintainer/owner of.