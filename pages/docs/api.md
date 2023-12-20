---
title: API Reference
---

# {% $markdoc.frontmatter.title %}

## Easy to use API

Create a new chat session:

```shell
curl https://app.tryhelix.ai/api/v1/sessions \
  -H 'Authorization: Bearer <YOUR_API_KEY>'
  -d "input=yo&mode=inference&type=text"
```

Generate an image:

```shell
curl https://app.tryhelix.ai/api/v1/sessions \
  -H 'Authorization: Bearer <YOUR_API_KEY>'
  -d "input=flying fish&mode=inference&type=image"
```

Get your API key from [Account](https://app.tryhelix.ai/account) page in the app.

For the rest of the endpoints, see the [code](https://github.com/helixml/helix/blob/main/api/pkg/server/server.go#L81-L215).

Please encourage us to write more on this on [Discord](https://discord.gg/VJftd844GE)!