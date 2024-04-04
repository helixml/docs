---
title: Deploying a Runpod Runner
description:
weight: 4
aliases:
  - /docs/runpod
---

Create a runpod pod thusly:

![](runpod.png)

**Don't use the version or arguments in the screenshot above, use the details below**

Container image:
```
europe-docker.pkg.dev/helixml/helix/runner:v0.6.9
```

Docker Command:
```
--api-host https://app.tryhelix.ai --api-token <RUNNER_TOKEN_FROM_ENV> --runner-id runpod-a100-cu12-001 --memory 80GB --allow-multiple-copies
```
