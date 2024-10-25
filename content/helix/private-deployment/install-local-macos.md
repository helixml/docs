---
title: Local Install of Helix on macOS
description: An end-to-end guide showing how to run Helix fully locally on macOS with Ollama.
weight: 2
tags:
- config
---

## Requirements

### Docker

1. Install Docker Desktop by visiting the [installer page](https://docs.docker.com/desktop/install/mac-install/)

### Ollama

1. Install Ollama by visitng the [installer page](https://ollama.com/download/mac)
2. Download Ollama Model (note - from here you need to open the terminal)
```shell
ollama pull llama3:instruct
```
1. Confirm that the model exists - values proceeding name of the model may differ
```shell
ollama ls | grep "llama3:instruct"
```
> You should get a confirmation similar to this:
```shell
llama3:instruct               365c0bd3c000    4.7 GB    43 hours ago
```

## Install Helix
### Run installation script
```shell
curl -sL -O https://get.helix.ml/install.sh && bash install.sh
```
![Install Helix Screenshot](install_helix_screenshot.png)
### Successful completion of the installation
![Successful Helix Installation Screenshot](successful_helix_installation_screenshot.png)
### Spin up Helix Docker Instances
1. Change directory to location of HelixML payload is downloaded
```shell
cd /Users/"<yourLocalUser>"/HelixML
```
2. Launch Docker Desktop on your computer
3. Launch Docker Containers
```shell
docker compose up -d --remove-orphans
```
![launching_helix_docker_containers_screenshot](launching_helix_docker_containers_screenshot.png)
3. Confirm that all container are running and show a healthy status
![helix_containers_healthy_screenshot](helix_containers_healthy_screenshot.png)

## Login to Helix UI
1. In a web browser go to: http://localhost:8080/
![helix_login_page_screenshot](helix_login_page_screenshot.png)
2. Register local user
   1. Bottom left pane - click on “Login/Register”
![helix_login_register_link_screenshot](helix_login_register_link_screenshot.png)
   2. Click on "Register" to begin the user registeration process
![user_registeration_link_screenshot](user_registeration_link_screenshot.png)
   3. Complete user registration
![complete_user_registeration_screenshot](complete_user_registeration_screenshot.png)
2. To access the app, log in to the local HelixML UI with your registered user credentials
![try_out_helix_ui_screenshot](try_out_helix_ui_screenshot.png)
