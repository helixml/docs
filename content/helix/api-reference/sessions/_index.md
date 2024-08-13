---
title: Sessions
weight: 1
prev: /helix/api-reference/_index.md
aliases:
  - /docs/sessions
---

An Helix session object is a structured data entity used to represent and manage the state, context, and interactions during a conversation between a user and an the Helix system. This object typically contains information necessary to maintain the continuity of the dialogue, track user inputs, and store any relevant context or variables that might influence the responses. All sessions are identified by a unique session ID.

## Explore Session metadata

Create a chat session on [Helix](https://app.tryhelix.ai/session/ses_01j56vxhjn6qh23hecxdan147a) and grab the session id from the browser URL.

```shell
curl 'https://app.tryhelix.ai/api/v1/sessions/<SESSION_ID>' \
  -H 'Authorization: Bearer <YOUR_API_KEY>' \
  --compressed
```

The response will show all of details of a session.

```json
{
    "id": "ses_testnan1brx876npc23",
    "name": "magical-chat-815",
    "parent_session": "",
    "parent_app": "",
    "config": {
        ...
    },
    "mode": "inference",
    "type": "image",
    "model_name": "stabilityai/stable-diffusion-xl-base-1.0",
    "lora_dir": "",
    "interactions": [
        {
            ...
        },
    ]
}

```

The [Helix Open API Spec](https://github.com/helixml/helix/blob/main/api/pkg/server/swagger.yaml) details the session request and response objects.