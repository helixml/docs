---
title: Knowledge
description: Knowledge provides context for your agents. Helix can scrape websites, ingest files, and connect to various data sources.
weight: 3
tags:
- agents
- knowledge
- rag
---

Knowledge provides context for your agents through RAG (Retrieval Augmented Generation). Helix can scrape websites, ingest files from cloud storage, or use inline content.

## Adding Knowledge

Knowledge is defined in the `knowledge` section of your agent configuration. Here's an example that scrapes a website and uses it as context:

```yaml
name: helix-docs
description: An agent that answers questions about Helix

assistants:
- name: Helix
  model: qwen3:8b
  system_prompt: |
    You are an expert at answering questions about the Helix platform.
    Use the knowledge base to provide accurate, detailed answers.

  knowledge:
  - name: helix-docs
    description: Helix documentation
    rag_settings:
      results_count: 8
      chunk_size: 2048
    source:
      web:
        urls:
        - https://docs.helixml.tech/helix/
        crawler:
          enabled: true
```

Deploy the agent:

```bash
helix apply -f helix_docs.yaml
```

## Using Knowledge

Once knowledge is defined for an agent, it automatically becomes available as a tool. The agent queries relevant chunks when answering user questions - no additional configuration required.

## Managing Knowledge

List all knowledge in your account:

```bash
helix knowledge ls
```

Output:

```
ID                              NAME            CREATED               SOURCE  STATE  REFRESH  SCHEDULE     VERSION
kno_01j69ssrht1gh6mf6wncwn7nb2  synpse-website  2024-08-27T11:33:37Z  web     ready  false                 2024-08-27_11-33-39
kno_01j6528kk0dzzsy9mzq1q3xhv5  helix-docs      2024-08-25T15:25:20Z  web     ready  true     @midnight    2024-08-26_17-41-46
```

| Field | Description |
|-------|-------------|
| **ID** | Unique identifier |
| **NAME** | Knowledge name |
| **CREATED** | Creation timestamp |
| **SOURCE** | Source type (web, filestore, content) |
| **STATE** | Current state: `ready`, `pending`, `indexing`, or `error` |
| **REFRESH** | Whether automatic refresh is enabled |
| **SCHEDULE** | Refresh schedule (if enabled) |
| **VERSION** | Current version timestamp |

## Refreshing Knowledge

Manually refresh knowledge with the `--refresh-knowledge` flag:

```bash
helix apply -f helix_docs.yaml --refresh-knowledge
```

Knowledge transitions through `pending` → `indexing` → `ready` states during refresh.

## Deleting Knowledge

```bash
helix knowledge rm kno_01j6528kk0dzzsy9mzq1q3xhv5
```

## RAG Settings

Configure chunking and retrieval behavior:

```yaml
knowledge:
- name: example-website
  rag_settings:
    results_count: 8        # Number of chunks to retrieve
    chunk_size: 2048        # Chunk size in bytes
    chunk_overflow: 256     # Overlap between chunks
    text_splitter: markdown # Or "text" (default: markdown)
    distance_function: l2   # Or "cosine", "ip" (inner product)
    threshold: 0.0          # Minimum similarity threshold
  source:
    web:
      urls:
      - https://example.com
```

### Custom Prompt Template

Customize the prompt template used to inject knowledge into the LLM context:

```yaml
knowledge:
- name: docs
  rag_settings:
    prompt_template: |
      Use the following context to answer questions:

      {{.Results}}

      If the context doesn't contain relevant information, say so.
  source:
    web:
      urls:
      - https://docs.example.com
```

Default template: [knowledge.tmpl](https://github.com/helixml/helix/blob/main/api/pkg/prompts/templates/knowledge.tmpl)

## Sources

Helix supports multiple knowledge sources.

### Web

Crawl websites and index their content:

```yaml
knowledge:
- name: my-website
  source:
    web:
      urls:
      - https://example.com
      - https://docs.example.com
      crawler:
        enabled: true
        max_depth: 3        # How deep to crawl
        max_pages: 100      # Maximum pages to crawl
```

#### Firecrawl Integration

Use [Firecrawl](https://github.com/mendableai/firecrawl) for advanced crawling:

```yaml
knowledge:
- name: docs
  source:
    web:
      urls:
      - https://example.com
      crawler:
        enabled: true
        firecrawl:
          api_key: ${FIRECRAWL_API_KEY}
```

### Inline Content

For small amounts of static content:

```yaml
knowledge:
- name: company-info
  source:
    content: |
      Company: Acme Corp
      Founded: 2020
      Headquarters: San Francisco
      Products: Widget Pro, Widget Enterprise
```

### Local Files

Upload files to Helix and reference them:

```bash
helix fs upload ~/Documents/manuals product-manuals
```

```yaml
knowledge:
- name: product-manuals
  source:
    filestore:
      path: product-manuals/
```

Supported file types: PDF, DOCX, PPTX, TXT, MD, HTML

Refresh after uploading new files:

```bash
helix apply -f agent.yaml --refresh-knowledge
```

### S3

Index files from Amazon S3:

```yaml
knowledge:
- name: s3-docs
  source:
    s3:
      bucket: my-bucket
      prefix: documents/
      region: us-east-1
      access_key_id: ${AWS_ACCESS_KEY_ID}
      secret_access_key: ${AWS_SECRET_ACCESS_KEY}
```

### Google Cloud Storage

Index files from GCS:

```yaml
knowledge:
- name: gcs-docs
  source:
    gcs:
      bucket: my-bucket
      prefix: documents/
      credentials_json: ${GCS_CREDENTIALS_JSON}
```

## Automatic Refresh

Configure periodic knowledge refresh for frequently updated sources:

```yaml
knowledge:
- name: helix-docs
  refresh_enabled: true
  refresh_schedule: "@midnight"
  source:
    web:
      urls:
      - https://docs.helixml.tech/helix/
      crawler:
        enabled: true
```

View refresh status and versions:

```bash
helix knowledge versions helix-docs
```

> Knowledge cannot be refreshed more often than once every 10 minutes.

### Simple Schedules

| Schedule | Description | Equivalent |
|----------|-------------|------------|
| `@yearly` | Once a year, Jan 1st midnight | `0 0 1 1 *` |
| `@monthly` | First of month, midnight | `0 0 1 * *` |
| `@weekly` | Sunday midnight | `0 0 * * 0` |
| `@daily` / `@midnight` | Every day at midnight | `0 0 * * *` |
| `@hourly` | Every hour | `0 * * * *` |

### Interval Schedules

```yaml
refresh_schedule: "@every 6h"      # Every 6 hours
refresh_schedule: "@every 30m"     # Every 30 minutes
refresh_schedule: "@every 1h30m"   # Every 1.5 hours
```

### Cron Syntax

```yaml
refresh_schedule: "0 9 * * 1-5"    # 9am on weekdays
refresh_schedule: "0 */6 * * *"    # Every 6 hours
refresh_schedule: "30 8 * * *"     # 8:30am daily
```

See [crontab.guru](https://crontab.guru/) for cron syntax help.

### Timezones

Specify a timezone for the schedule:

```yaml
refresh_schedule: "TZ=America/New_York 0 9 * * *"  # 9am New York time
refresh_schedule: "TZ=Europe/London 0 8 * * *"     # 8am London time
refresh_schedule: "TZ=UTC 0 0 * * *"               # Midnight UTC
```

## Versioning

Each knowledge refresh creates a new version (format: `YYYY-MM-DD_HH-MM-SS`). Versions are isolated to prevent data duplication during re-indexing.

List versions:

```bash
helix knowledge versions helix-docs
```
