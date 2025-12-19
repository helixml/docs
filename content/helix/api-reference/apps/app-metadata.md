---
title: Get Agent Metadata
weight: 4
prev: /helix/api-reference/apps/app-list.md
aliases:
  - /docs/apps/get-app
tags:
- agents
- api
---

See the Helix [OpenAPI Spec](https://github.com/helixml/helix/blob/main/api/pkg/server/swagger.yaml) or the [code](https://github.com/helixml/helix/blob/main/api/pkg/server/server.go#L81-L215) for more information.

## Get metadata for a single agent

First get the ID of the agent from the [List Agents](/helix/api-reference/apps/app-list.md) endpoint

```
curl -X 'GET' \
  'https://app.tryhelix.ai/api/v1/apps/APP_ID' \
  --header 'accept: application/json' \
  --header 'Authorization: <YOUR API KEY>'
```

## HTTP Request
```
GET https://app.tryhelix.ai/api/v1/apps/{id}
```

## HTTP Response
```json
{
  "app_source": "helix",
  "config": {
    "allowed_domains": [
      "string"
    ],
    "github": {
      "hash": "string",
      "key_pair": {
        "privateKey": "string",
        "publicKey": "string",
        "type": "string"
      },
      "last_update": {
        "error": "string",
        "hash": "string",
        "updated": "string"
      },
      "repo": "string",
      "webhook_secret": "string"
    },
    "helix": {
      "assistants": [
        {
          "apis": [
            {
              "description": "string",
              "headers": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
              },
              "name": "string",
              "query": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
              },
              "request_prep_template": "string",
              "response_error_template": "string",
              "response_success_template": "string",
              "schema": "string",
              "url": "string"
            }
          ],
          "avatar": "string",
          "description": "string",
          "gptscripts": [
            {
              "content": "string",
              "description": "string",
              "file": "string",
              "name": "string"
            }
          ],
          "id": "string",
          "image": "string",
          "is_actionable_template": "string",
          "lora_id": "string",
          "model": "string",
          "name": "string",
          "rag_source_id": "string",
          "system_prompt": "string",
          "tools": [
            {
              "config": {
                "api": {
                  "actions": [
                    {
                      "description": "string",
                      "method": "string",
                      "name": "string",
                      "path": "string"
                    }
                  ],
                  "headers": {
                    "additionalProp1": "string",
                    "additionalProp2": "string",
                    "additionalProp3": "string"
                  },
                  "query": {
                    "additionalProp1": "string",
                    "additionalProp2": "string",
                    "additionalProp3": "string"
                  },
                  "request_prep_template": "string",
                  "response_error_template": "string",
                  "response_success_template": "string",
                  "schema": "string",
                  "url": "string"
                },
                "gptscript": {
                  "script": "string",
                  "script_url": "string"
                }
              },
              "created": "string",
              "description": "string",
              "global": true,
              "id": "string",
              "name": "string",
              "owner": "string",
              "owner_type": "user",
              "tool_type": "api",
              "updated": "string"
            }
          ],
          "type": ""
        }
      ],
      "avatar": "string",
      "description": "string",
      "external_url": "string",
      "image": "string",
      "name": "string",
      "triggers": [
        {
          "cron": {
            "input": "string",
            "schedule": "string"
          },
          "discord": {
            "server_name": "string"
          }
        }
      ]
    },
    "secrets": {
      "additionalProp1": "string",
      "additionalProp2": "string",
      "additionalProp3": "string"
    }
  },
  "created": "string",
  "global": true,
  "id": "string",
  "owner": "string",
  "owner_type": "user",
  "shared": true,
  "updated": "string"
}
```

