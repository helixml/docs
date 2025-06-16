---
title: API Reference
weight: 8
prev: /helix/private-deployment/_index.md
aliases:
  - /docs/api
tags:
- api
---

The REST API is the fundamental fabric of Helix. All operations and communications between components, and external user commands are REST API calls that the Control Plane handles. For general background information, get familiar with the [Helix architecture](/helix/getting-started/architecture/index.md) and the components involved.

With Helix's API, you can access a wide range of features, including natural language processing, machine learning models, data analysis, and more. Here's how to get started:

1. **API Key and Authentication**: First, sign up on [Helix](https://app.tryhelix.ai/) and obtain your API key from the [Account section](https://app.tryhelix.ai/account). The API key is required to authenticate your requests and ensure secure communication between your application and Helix.

All API requests should include your API key in an Authorization HTTP header as follows:

```
Authorization: Bearer Helix_API_KEY
```

2. **Making Requests**: Use HTTP methods like GET, POST, PUT, and DELETE to interact with the API. Depending on the feature you're utilizing, you may need to send JSON data, files, or other inputs in your requests.

3. **Handling Responses**: The API will return responses in JSON format, containing the results of your request, status codes, and any relevant error messages. Properly handle these responses in your application to ensure smooth operation.


## API Reference

You can access up-to-date API documentation in your helix deployment at `/api-reference`. For example, for our SaaS you can view [https://app.tryhelix.ai/api-reference](https://app.tryhelix.ai/api-reference).

## More Information

Get your API key from [Account](https://app.tryhelix.ai/account) page in the app.

For the rest of the endpoints, see the generated [OpenAPI Spec](https://github.com/helixml/helix/blob/main/api/pkg/server/swagger.yaml) or the [code](https://github.com/helixml/helix/blob/main/api/pkg/server/server.go#L81-L215).

Please encourage us to write more on this on [Discord](https://discord.gg/VJftd844GE)!

<!--more-->

{{< default-section-cards-list >}}
