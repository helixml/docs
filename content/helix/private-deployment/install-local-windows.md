---
title: Local Install of Helix on Windows (WSL2)
description: An end-to-end guide showing how to run Helix fully locally on Windows with Ollama.
weight: 2
tags:
- config
---

## Requirements
**_Created on Windows (WSL2)_**
1. Following instructions assume that you have WSL installed
   1. Open PowerShell or Windows Command Prompt in administrator mode by right-clicking and selecting Run as administrator
```shell
wsl --install
```

2. Install Docker Desktop
    [Install Docker](https://docs.docker.com/desktop/install/windows-install/)

3. Install Ollama 
    [Install Ollama](https://ollama.com/download/windows)
4. Download Ollama Model
```shell   
ollama pull llama3:instruct
```
Confirm that the model exists - values proceeding name of the model may differ
ollama ls | grep "llama3:instruct"

You should get a confirmation similar to this:

llama3:instruct               365c0bd3c000    4.7 GB    43 hours ago



## Install Helix Windows (WSL2)
### This will set up the CLI, the controlplane talking to ollama locally

```shell
curl -sL -O https://get.helixml.tech/install.sh
chmod +x install.sh
./install.sh --openai-api-key ollama --openai-base-url http://host.docker.internal:11434/v1
```

### Spin up Helix Docker Instances
1. Start Helix Services
```shell
cd /opt/HelixML
sudo docker compose up -d --remove-orphans
```
## Login to Helix UI
1. In a web browser go to: http://localhost:8080/
2. Register local user
   1. Bottom left pane - click on "Login/Register"
   2. Click on "Register" to begin the user registration process
   3. Complete user registration
3. To access the app, log in to the local HelixML UI with your registered user credentials

