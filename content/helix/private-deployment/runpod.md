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
europe-docker.pkg.dev/helixml/helix/runner:<LATEST_TAG>
```

Where `<LATEST_TAG>` is the tag of the latest release in the form `X.Y.Z` from [https://github.com/helixml/helix/releases](https://github.com/helixml/helix/releases)

Docker Command:
```
--api-host https://<YOUR_CONTROLPLANE_HOSTNAME> --api-token <RUNNER_TOKEN_FROM_ENV> --runner-id runpod-a100-cu12-001 --memory <GPU_MEMORY>GB --allow-multiple-copies
```

Replace `<RUNNER_TOKEN_FROM_ENV>` and `<GPU_MEMORY>` accordingly.
