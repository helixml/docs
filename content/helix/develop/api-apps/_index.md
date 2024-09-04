---
title: Apps with API tooling
linkTitle: Apps with API tooling
description: Learn how to connect a Helix app to an API.
weight: 5
---

To develop a Helix app that connects to an API using the OpenAPI specification, follow these steps:

1. **Create a `helix.yaml` file**:
   Define the app's name, description, and API details. The app specification follows [AI Spec](https://aispec.org/) to make it easier for developers to enrich their applications with Generative AI by supporting a common format across many runtimes.

   Below is an example app that connects to an API and enriches answers from the LLM with data from the API.

   ```yaml
   name: My API App
   description: A Helix app connecting to an external API
   assistants:
       apis:
         - name: External API
           url: http://api-url.com
           schema: ./api/openapi.yaml //path to your Open API Spec
   ```

   You can provide a list of API integrations, each of which has the following format
- name: a name for the API
- description: what the API does. The model will use this in selecting which API to call based on the user's input
- url: the URL that the API is available on
- schema: an OpenAPI specification for the API in Open API Spec v3. The model will use this to construct a request to the API.

   The assistant will classify whether an API needs to be called based on the user's query, construct the API call and then summarize the response back to the user.

2. **Deploy the App**:
   Use the Helix CLI:
   ```bash
   helix apply -f helix.yaml
   ```
   Follow the instructions [here for Helix CLI installation](/helix/using-helix/client/_index.md).

4. **Test the API**:
   Run a curl command with your API key to ensure the connection works.

   1. Find the app you just deployed to Helix on the Helix UI. Navigate to 'Your Apps' at https://app.tryhelix.ai/apps
   2. Click on your `App` and scroll to the bottom right. Copy the `key` under `API Keys`. If none exist, you will see an option to create a new App API Key.
   3. Run a curl request using this key as the bearer token. This will trigger your app.

   ```bash
   curl -i -H "Authorization: Bearer YOUR_APP_API_KEY" https://app.tryhelix.ai/v1/chat/completions \
   --data-raw '{"messages":[{"role":"user","content":"Using the API, answer my query about XYZ"}], "model":"llama3:instruct", "stream":false}'
   ```
