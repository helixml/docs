---
title: Sessions
weight: 1
prev: /helix/api-reference/_index.md
aliases:
- /docs/sessions
tags:
- sessions
- api
---

Sessions represent conversations between users and Helix. Each session maintains context, tracks interactions, and stores conversation history.

## List Sessions

```bash
curl 'https://app.tryhelix.ai/api/v1/sessions' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

## Get Session

Retrieve details of a specific session:

```bash
curl 'https://app.tryhelix.ai/api/v1/sessions/{session_id}' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

Response:

```json
{
  "id": "ses_01j56vxhjn6qh23hecxdan147a",
  "name": "magical-chat-815",
  "parent_app": "app_01hzm1232trzrcdg01nvmfqz89",
  "mode": "inference",
  "model_name": "qwen3:8b",
  "interactions": [
    {
      "id": "int_01j56vxhjn6qh23hecxdan147b",
      "created": "2024-08-08T15:42:44Z",
      "message": "Hello, how can I help?",
      "role": "assistant"
    }
  ],
  "created": "2024-08-08T15:42:44Z",
  "updated": "2024-08-08T15:42:44Z"
}
```

## Delete Session

```bash
curl -X DELETE 'https://app.tryhelix.ai/api/v1/sessions/{session_id}' \
  -H 'Authorization: Bearer YOUR_API_KEY'
```

{{< default-section-cards-list >}}
