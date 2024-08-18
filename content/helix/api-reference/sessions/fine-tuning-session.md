---
title: Fine Tuning Session
weight: 2
prev: /helix/api-reference/sessions/chat-sessions.md
aliases:
  - /docs/fine-tuning-session
---


## Create a Text Fine-Tuning Session

First create a file that will be used to upload the text data. It should be in [`multipart/form-data` format](https://www.rfc-editor.org/rfc/rfc7578). The form data keys `mode` and `type` are required to distinguish that this is a text fine-tuning session.

##### Example Request and Response

```shell
cat >session-data.form <<EOL
-----BOUNDARY
Content-Disposition: form-data; name="files"; filename="textfile-1.txt"
Content-Type: application/octet-stream

This is the text for the first file. Create your own AI using any data\\nBuild and optimize text and image AI for your needs. Train, fine-tune, and generate from your data. Deploy in your cloud — or use ours
-----BOUNDARY
Content-Disposition: form-data; name="files"; filename="textfile-2.txt"
Content-Type: application/octet-stream

This is the text for the second file.
-----BOUNDARY
Content-Disposition: form-data; name="mode"

finetune
-----BOUNDARY
Content-Disposition: form-data; name="type"

text
-----BOUNDARY--
EOL
```

Now `POST` that file to Helix to create a new fine-tuning session.

```shell
curl 'https://app.tryhelix.ai/api/v1/sessions/learn' \
  -H 'Authorization: Bearer <YOUR_API_KEY>' \
  -H 'Content-Type: multipart/form-data; boundary=---BOUNDARY' \
  --data-binary @session-data.form \
  --compressed
```

##### Check on the Status of a Fine-Tune Session

First grab the ID of your session from the `id` field of the output of the create session API. Then run:

```shell
curl 'https://app.tryhelix.ai/api/v1/sessions/<SESSION_ID>' \
  -H 'Authorization: Bearer <YOUR_API_KEY>' \
  --compressed
```

The response will show all of the generated QA pairs for the fine-tune session as well as the status of the session.

Look at the `interactions` key to find the current state.

##### HTTP Request

```
POST https://app.tryhelix.ai/api/v1/sessions/learn
```

##### HTTP Request Body
Request body with the message and model to start chat completion.

```json
{
  "data_entity_id": "string",
  "default_rag_model": "string",
  "rag_enabled": true,
  "rag_settings": {
    "chunk_overflow": 0,
    "chunk_size": 0,
    "distance_function": "string",
    "results_count": 0,
    "threshold": 0
  },
  "text_finetune_enabled": true,
  "type": ""
}
```

##### HTTP Response

```json
{
  "config": {
    "active_tools": [
      "string"
    ],
    "app_query_params": {
    },
    "assistant_id": "string",
    "avatar": "string",
    "document_group_id": "string",
    "document_ids": {
    },
    "eval_automatic_reason": "string",
    "eval_automatic_score": "string",
    "eval_manual_reason": "string",
    "eval_manual_score": "string",
    "eval_original_user_prompts": [
      "string"
    ],
    "eval_run_id": "string",
    "eval_user_reason": "string",
    "eval_user_score": "string",
    "finetune_data_entity_id": "string",
    "helix_version": "string",
    "manually_review_questions": true,
    "origin": {
      "cloned_interaction_id": "string",
      "cloned_session_id": "string",
      "type": ""
    },
    "original_mode": "",
    "priority": true,
    "rag_enabled": true,
    "rag_settings": {
      "chunk_overflow": 0,
      "chunk_size": 0,
      "distance_function": "string",
      "results_count": 0,
      "threshold": 0
    },
    "rag_source_data_entity_id": "string",
    "shared": true,
    "stream": true,
    "system_prompt": "string",
    "text_finetune_enabled": true,
    "uploaded_data_entity_id": "string"
  },
  "created": "string",
  "id": "string",
  "interactions": [
  ],
  "lora_dir": "string",
  "mode": "",
  "model_name": "",
  "name": "string",
  "owner": "string",
  "owner_type": "user",
  "parent_app": "string",
  "parent_session": "string",
  "type": "",
  "updated": "string"
}
```