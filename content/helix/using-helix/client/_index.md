---
title: Helix CLI
weight: 1
---


## Helix Client

The Helix CLI is a tool for interacting with Helix programmatically. Use it to deploy agents, create sessions, manage knowledge bases, and more.

## Installation

To install the Helix client, get the Helix installation script:

```bash
curl -Ls -o install-helix.sh https://get.helixml.tech
chmod +x install-helix.sh
```

Install the Helix client with
```bash
./install-helix.sh --cli
```


## Getting Started

Once installed, you can start using the Helix CLI by first logging into your Helix account and getting your API Keys setup

```bash
export HELIX_API_KEY=your-API-key
export HELIX_URL=your-helix-control-plane-URL # defaults to https://app.tryhelix.ai/
```

## Commands

```
$ helix
Private GenAI Platform

Usage:
  helix [command]

Available Commands:
  agent            Helix agent management
  apply            Create or update an agent
  completion       Generate the autocompletion script for the specified shell
  help             Help about any command
  knowledge        Helix knowledge management
  run              Run a session in helix
  runner           Start a helix runner
  serve            Start the helix api server
  version          Print version

Flags:
  -h, --help   help for helix

Use "helix [command] --help" for more information about a command.
```

## Apply

The apply command is used to apply the supplied configuration to create or update a Helix agent.

```shell
helix apply -f hn-scraper.yaml
```
where the hn-scraper.yaml has the configuration defined in [AI Spec](https://aispec.org/).

Eg. API configuration for the HN Scraper
```
name: HN Scraper
description: A scraper for Hacker News (duh).
image: https://miro.medium.com/v2/resize:fit:1000/1*eessO5f7Bdflb4WprH75ow.jpeg
assistants:
- model: llama3:instruct
  system_prompt: |
    You are a helpful bot that fetches information from Hacker News website https://news.ycombinator.com/ and all it's sub-pages. Use
    as much background knowledge as possible to answer the question and provide creative ways to explore Hacker News.
  knowledge:
  - name: hn
    # Turn on periodic refreshing
    refresh_enabled: true
    # Refresh every 24 hours
    refresh_schedule: "0 0 * * *"
    rag_settings:
      results_count: 8
      chunk_size: 2048
    source:
      web:
        urls:
        - https://news.ycombinator.com/
        crawler:
          enabled: true
```

See the [Developing Helix Agents](/helix/develop/apps/) guide for more information on creating agents.

## Agents

This lists Helix agents that have been created by the user.

```bash
$ helix agent ls
  ID                              NAME                           CREATED              SOURCE
  app_01hzm1232trzrcdg01nvmfqz89  Curated Chuck Norris facts     2024-06-05 10:53:19  github
  app_01hz5nd234ysastmnskaj5v82a  UK Bank holiday                2024-05-30 21:10:13  github
  app_01hz5234596jfwqpghrct22746  HTTP Cats for every HTTP code  2024-05-30 15:25:20  github
  app_01j6q3456q3y22wvkna925vcdj  HN Scraper                     2024-09-01 22:04:19  github
  app_01j6q3456aqdxje5s6gqqs2t4h  helix-docs                     2024-09-01 18:35:10  helix

```

## Knowledge

This lists Helix [knowledge](helix/develop/knowledge/index.md) contexts that have been setup by the user.

```bash
$ helix knowledge ls
  ID                              NAME  CREATED               SOURCE  STATE  REFRESH  SCHEDULE   NEXT RUN  VERSION              SIZE
  kno_01j6qsw8k05nk0gzy3sw811r8r  hn    2024-09-01T22:04:21Z  web     ready  true     0 0 * * *            2024-09-02_00-00-00  616 kB

```


