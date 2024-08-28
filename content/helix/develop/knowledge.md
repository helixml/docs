---
title: Knowledge
description: Knowledge provides a context for your LLM apps. Helix can scrape websites, ingest files from AWS S3, GCS, or your local filesystem.
weight: 4
---

Knowledge provides a context for your LLM apps. Helix can scrape websites, ingest files from AWS S3, GCS, or your local filesystem.

## Adding Knowledge

Knowledge lives in the `knowledge` section of your Helix app spec. Here's an example of an app that instructs Helix to scrape the website and use it as context for answering questions:

```yaml
# helix_docs.yaml
name: helix-docs
description: |
  A simple app that demonstrates how to setup Helix with knowledge from the Helix docs
assistants:
- name: Helix 
  model: meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo
  system_prompt: |
    You are an expert at answering questions about the website https://docs.helix.ml/ and how to
    run the Helix platform. Make sure your answers are detailed but concise. Use 
    as much background knowledge as possible to answer the question and provide creative ways 
    to resolve the question.
  knowledge:
  - name: helix-docs
    rag_settings:
      results_count: 8
      chunk_size: 2048
    source:      
      web:        
        urls:
        - https://docs.helix.ml/helix/
        crawler:
          enabled: true
```

To create the app, run:

```bash
helix apply -f helix_docs.yaml
```

## Using the Knowledge

Once knowledge is defined for the application, it will automatically be used by Helix when interacting with the Helix app. No additional setup or configuration is required. 

## Managing Knowledge

You can list all the knowledge in your Helix app with:

```bash
helix knowledge ls
```

The output should look like this:

```
helix knowledge ls
ID                              NAME                  CREATED               SOURCE  STATE  REFRESH ENABLED  VERSION
kno_01j69ssrht1gh6mf6wncwn7nb2  synpse-website        2024-08-27T11:33:37Z  web     ready  false            2024-08-27_11-33-39
kno_01j6528kk0dzzsy9mzq1q3xhv5  helix-docs            2024-08-25T15:25:20Z  web     ready  false            2024-08-26_17-41-46
```

Here:
- `ID` is the unique identifier for the knowledge.
- `NAME` is the name of the knowledge.
- `CREATED` is the date and time when the knowledge was created.
- `SOURCE` is the source of the knowledge.
- `STATE` is the state of the knowledge. Other than `ready`, `pending` and `indexing` are temporary states. You will see an `error` state if the knowledge fails to be extracted or indexed.
- `REFRESH` is the refresh status of the knowledge.
- `ENABLED` is the enabled status of the knowledge.
- `VERSION` is the version of the knowledge.

## Refreshing Knowledge

You can refresh knowledge with `--refresh-knowledge` flag on `helix apply`:

```bash
helix apply -f helix_docs.yaml --refresh-knowledge
```

For refresh, knowledge is moved into the `pending` and then `indexing` states.

## Deleting Knowledge

You can delete knowledge with:

```bash
helix knowledge rm kno_01j6528kk0dzzsy9mzq1q3xhv5
```

## Available RAG configuration options

While Helix defaults sensible defaults, there's sometimes a need to to adjust settings such as `chunk_size` or `results_count` for your use case. You can also configure the template used to construct the "background knowledge" prompt that is sent to the LLM.

```yaml
knowledge:
- name: example-website
  rag_settings:
    results_count: 8        # Number of chunks to return and provide to the LLM
    chunk_size: 2048        # Size of each chunk in bytes
    text_splitter: markdown # Or text (default is markdown)
    prompt_template: |
      <customize here, default is here https://github.com/helixml/helix/blob/main/api/pkg/prompts/templates/knowledge.tmpl>
  source:      
    web:        
      urls:
      - https://synpse.com        
      crawler:
        enabled: true
```


## Sources

Helix provides a multi-source support for knowledge. You can use a combination of web, S3, GCS, and local file sources. 

### Web

### Local files

### Basic single file

## Versioning

Whenever you update your knowledge, Helix will create a new version of the knowledge. Version format is `YYYY-MM-DD_HH-MM-SS`. Each re-indexing will create a new version so the data will not clash and will not be duplicated when Helix fetches the background knowledge for the LLM call.

At the moment available versions are not exposed to the user but we will be adding this feature in the future.