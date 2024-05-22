---
title: Deploying a Runpod Runner
description:
weight: 4
aliases:
  - /docs/runpod
---

Create a runpod GPU pod template like this:

![](runpod.png)

**Don't use the version or arguments in the screenshot above, use the details below**

Container image:
```
registry.helix.ml/helix/runner:<LATEST_TAG>
```

Where `<LATEST_TAG>` is the tag of the latest release in the form `X.Y.Z` from [https://github.com/helixml/helix/releases](https://github.com/helixml/helix/releases)

Docker Command:
```
--api-host https://<YOUR_CONTROLPLANE_HOSTNAME> --api-token <RUNNER_TOKEN_FROM_ENV> --runner-id runpod-001 --memory <GPU_MEMORY>GB --allow-multiple-copies
```

Replace `<RUNNER_TOKEN_FROM_ENV>` and `<GPU_MEMORY>` accordingly. You might want to update the `runner-id` with a more descriptive name, and make sure it's unique. That ID will show up in the helix dashboard at `https://<YOUR_CONTROLPLANE_HOSTNAME>/dashboard` for admin users.

Then start runners from your template, customizing the docker command accordingly.
