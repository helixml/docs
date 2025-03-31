---
title: Local Install of Helix on macOS
description: An end-to-end guide showing how to run Helix fully locally on macOS with Ollama.
weight: 2
tags:
- config
---

## Requirements

### Docker

1. Install Docker Desktop by visiting the [installer page](https://docs.docker.com/desktop/install/mac-install/) and if this is your first time installing Docker Desktop, you may want to restart your computer after installation. Otherwise, Helix may not be able to find it in the later steps below.

### Ollama

1. Install Ollama by visiting the [installer page](https://ollama.com/download/mac)
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
curl -sL -O https://get.helixml.tech/install.sh && bash install.sh
```

<img width="641" alt="Screenshot 2024-10-25 at 08 11 46" src="https://github.com/user-attachments/assets/7bb53101-151d-4732-8458-3e9146dfda24">

### Successful completion of the installation

<img width="814" alt="Screenshot 2024-10-25 at 08 13 05" src="https://github.com/user-attachments/assets/a54c475c-9906-49e7-a1e9-b4d68f2e56fe">


### Spin up Helix Docker Instances
1. Change directory to location of HelixML payload is downloaded
```shell
cd ~/HelixML
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
