---
title: Helix Agents
description: Build AI agents with skills, knowledge, and integrations.
weight: 3
---

Helix agents combine language models with skills, knowledge bases, and external integrations. An agent receives a user message, decides which tools to use, executes them, and synthesizes a response.

## How Agents Work

When a user sends a message, the agent:

1. Loads the assistant configuration (model, system prompt, skills)
2. Queries relevant knowledge bases for context
3. Calls the LLM with available tools exposed as OpenAI function calls
4. Executes any tools the LLM decides to use (in parallel if multiple)
5. Adds results to the conversation and repeats until done

Agents iterate up to a configurable maximum (default 10) before stopping to prevent runaway loops.

## Skills

Skills are capabilities you attach to an agent. Each skill exposes one or more tools the LLM can invoke.

### Built-in Skills

| Skill | Description |
|-------|-------------|
| **Web Search** | Search the internet and browse results |
| **Browser** | Open URLs and extract content as markdown |
| **Knowledge** | Query RAG sources for document retrieval |
| **API Calling** | Execute REST APIs defined with OpenAPI schemas |
| **Calculator** | Perform mathematical operations |
| **Memory** | Persist information across sessions |
| **MCP** | Connect to Model Context Protocol servers |

### Enabling Skills

Skills are enabled in the assistant configuration:

```yaml
assistants:
- name: Research Assistant
  model: qwen3:8b
  system_prompt: You help users research topics.

  web_search:
    enabled: true
    max_results: 10

  browser:
    enabled: true
    markdown_post_processing: true

  calculator:
    enabled: true
```

## Knowledge

Knowledge bases provide RAG (retrieval augmented generation) for your agents. When attached to an assistant, knowledge becomes a tool the agent can query.

```yaml
assistants:
- model: qwen3:8b
  knowledge:
  - name: product-docs
    description: Product documentation and API reference
    source:
      web:
        urls:
        - https://docs.example.com/
        crawler:
          enabled: true
    rag_settings:
      results_count: 8
      chunk_size: 2048
```

Knowledge sources can be:

- **Web URLs** with optional crawling
- **Uploaded files** (PDF, DOCX, PPTX)
- **Inline content** (text directly in config)
- **S3 buckets**
- **Google Drive**

Knowledge can refresh on a schedule:

```yaml
knowledge:
- name: news-feed
  refresh_enabled: true
  refresh_schedule: "0 */6 * * *"  # Every 6 hours
  source:
    web:
      urls:
      - https://news.example.com/feed
```

## API Integrations

Connect agents to REST APIs using OpenAPI schemas. The agent can call endpoints based on user requests.

```yaml
assistants:
- model: qwen3:8b
  apis:
  - name: Weather API
    description: Get current weather and forecasts
    url: https://api.weather.example.com
    schema: |
      openapi: 3.0.0
      info:
        title: Weather API
        version: 1.0.0
      paths:
        /current:
          get:
            summary: Get current weather
            parameters:
            - name: city
              in: query
              required: true
              schema:
                type: string
```

For APIs requiring authentication, use OAuth providers:

```yaml
apis:
- name: GitHub
  url: https://api.github.com
  schema: ./github-openapi.yaml
  oauth_provider: github
  oauth_scopes:
  - repo
  - read:user
```

## MCP Servers

Model Context Protocol (MCP) lets agents connect to external tool servers. Any MCP-compatible server exposes its tools to your agent.

```yaml
assistants:
- model: qwen3:8b
  mcps:
  - name: Database Tools
    description: Query and manage database records
    url: https://mcp.example.com/tools
    headers:
      Authorization: Bearer ${MCP_API_KEY}
```

MCP servers can also use OAuth for authentication:

```yaml
mcps:
- name: Salesforce
  url: https://mcp.salesforce.example.com
  oauth_provider: salesforce
  oauth_scopes:
  - api
  - refresh_token
```

## Triggers

Agents can be triggered from various sources beyond the chat UI:

### Discord

```yaml
triggers:
- discord:
    server_name: My Server
    channel_names:
    - support
    - general
```

### Slack

```yaml
triggers:
- slack:
    bot_token: ${SLACK_BOT_TOKEN}
    channels:
    - C01234567
```

### Scheduled (Cron)

```yaml
triggers:
- cron:
    schedule: "0 9 * * 1-5"  # 9am weekdays
    input: Generate the daily report
```

### Webhooks

Agents expose webhook endpoints that can be called by external systems to trigger conversations.

## Secrets

Store sensitive values as secrets rather than hardcoding them:

```yaml
assistants:
- model: qwen3:8b
  apis:
  - name: Internal API
    url: https://api.internal.example.com
    headers:
      X-API-Key: ${INTERNAL_API_KEY}
```

Secrets are configured in the Helix UI under the app settings, or via the `secrets` field in the app configuration.

## Agent Types

Helix supports different agent execution modes:

| Type | Description |
|------|-------------|
| **standard** | Normal tool-calling agent with iterative execution |
| **reasoning** | Extended thinking mode for complex problems |
| **coder** | Code execution with sandbox environment |
| **external_agent** | Runs in isolated desktop environment |

Set the agent type in the assistant configuration:

```yaml
assistants:
- model: qwen3:8b
  agent_type: reasoning
  max_iterations: 20
```

## Example: Full Agent Configuration

```yaml
name: Customer Support Agent
description: Handles customer inquiries with access to docs and CRM

assistants:
- name: Support
  model: qwen3:8b
  system_prompt: |
    You are a helpful customer support agent. Use the knowledge base
    to answer product questions and the CRM API to look up customer
    information when needed.

  temperature: 0.3
  max_iterations: 15

  knowledge:
  - name: help-docs
    description: Product documentation and FAQs
    source:
      web:
        urls:
        - https://help.example.com/
        crawler:
          enabled: true
          max_depth: 3

  apis:
  - name: CRM
    description: Look up customer records and order history
    url: https://crm.example.com/api
    schema: ./crm-openapi.yaml
    oauth_provider: internal-sso

  web_search:
    enabled: true

triggers:
- slack:
    bot_token: ${SLACK_BOT_TOKEN}
    channels:
    - support-requests
- cron:
    schedule: "0 8 * * 1"
    input: Generate weekly support summary
```
