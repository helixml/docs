---
title: Deploying a Runpod Runner
description:
---

# {% $markdoc.frontmatter.title %}

Create a runpod pod thusly:

![](/images/runpod.png)

Container image:
```
europe-docker.pkg.dev/helixml/helix/runner:v0.2.3
```

Docker Command:
```
--api-host https://app.tryhelix.ai --api-token <YOUR_API_KEY> --runner-id runpod-a100-cu12-001 --memory 80GB --allow-multiple-copies --timeout-seconds 120
```