---
title: Chat Session
weight: 1
prev: /helix/api-reference/sessions/_index.md
aliases:
  - /docs/chat-session
---

## Create an inference session

An *inference session* is when a trained machine learning model is used to make predictions or decisions based on new data. Unlike training, which involves learning from data, inference applies the learned model to real-world inputs to produce outputs. Helix offers various [AI models](https://docs.helix.ml/helix/models/models/) which can be used for inference.

##### Example Request and Response

```shell
curl --location 'https://app.tryhelix.ai/api/v1/sessions/chat' \
--header 'Authorization: Bearer <YOUR_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
  "session_id": "",
  "system": "you are an intelligent assistant that helps with geography",
  "messages": [
    {
      "role": "user",
      "content": { "content_type": "text", "parts": ["where are the Faroe islands located?"] }
    }
  ]
}'
```

will respond with

```json
{
    "created": 1723155364,
    "object": "chat.completion",
    "id": "ses_01a4t10c132825d3k037tyh7ap",
    "model": "llama3:instruct",
    "choices": [
        {
            "index": 0,
            "finish_reason": "stop",
            "message": {
                "role": "assistant",
                "content": "The Faroe Islands (Føroyar in Faroese) are a North Atlantic archipelago located halfway between Iceland and Norway."
            }
        }
    ],
    "usage": {
        "prompt_tokens": 0,
        "completion_tokens": 168,
        "total_tokens": 168
    }
}
```

##### HTTP Request

```
POST https://app.tryhelix.ai/api/v1/sessions/chat
```

##### HTTP Request Body
Request body with the message and model to start chat completion.

```json
{
  "app_id": "string",
  "assistant_id": "string",
  "legacy": true,
  "lora_dir": "string",
  "lora_id": "string",
  "messages": [
    {
      "content": {
        "content_type": "text",
        "parts": [
          "string"
        ]
      },
      "created_at": "string",
      "id": "string",
      "role": "system",
      "state": "",
      "updated_at": "string"
    }
  ],
  "model": "string",
  "rag_source_id": "string",
  "session_id": "string",
  "stream": true,
  "system": "string",
  "tools": [
    "string"
  ],
  "type": "text"
}
```

`"type":"image|chat"`

Switching over the `"type":"image"` will start a session with model `stabilityai/stable-diffusion-xl-base-1.0` that generates an image.

##### HTTP Response
```json
{
  "choices": [],
  "created": 0,
  "data": [
    {
      "b64_json": "string",
      "embedding": [
        0
      ],
      "index": 0,
      "object": "string",
      "url": "string"
    }
  ],
  "id": "string",
  "model": "string",
  "object": "string",
  "usage": {
    "completion_tokens": 0,
    "prompt_tokens": 0,
    "total_tokens": 0
  }
}
```