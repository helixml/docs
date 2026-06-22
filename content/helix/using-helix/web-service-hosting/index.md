---
title: Web Service Hosting
linkTitle: Web Service Hosting
description: Host a project's web app on a Helix domain, with durable state across deploys and reboots.
weight: 6
tags:
- web-service
- hosting
- persistence
---

Helix can host a project's web application on a custom or default domain. On
each deploy, Helix runs your repo's `.helix/startup.sh` inside a sandbox and
routes public traffic to it. This page explains how your application's **state
(databases, uploads, etc.) persists** and how the service is **pinned to a
runner**.

## Durable storage: write to `/data`

Each project's web service gets a durable data directory mounted at **`/data`**
inside the container. Your startup script receives the path in the
`HELIX_WEB_SERVICE_DATA_DIR` environment variable.

**Put anything that must survive a deploy or reboot under `/data`** — your
database files, user uploads, generated assets, and so on. Code is re-cloned on
every deploy and lives under `/workspace`; only `/data` is durable.

```bash
# .helix/startup.sh
set -e

DATA_DIR="${HELIX_WEB_SERVICE_DATA_DIR:-/data}"
PORT="${HELIX_WEB_SERVICE_PORT:-8080}"

# Example: point Postgres at the durable dir
export PGDATA="$DATA_DIR/postgres"
[ -d "$PGDATA" ] || initdb "$PGDATA"
pg_ctl -D "$PGDATA" -o "-p 5432" -w start

# Example: a SQLite-backed app
export DATABASE_URL="sqlite:///$DATA_DIR/app.db"

exec ./my-web-app --port "$PORT"
```

The `/data` directory is keyed to the **project**, not to any single deploy or
sandbox, so it is re-attached to every new deploy and is never deleted when a
sandbox is torn down.

## Deploys are in-place (one instance at a time)

A web app that owns a database keeps that database **on disk**. Two processes
must never open the same on-disk database at once — Postgres refuses to start a
second instance against the same data directory, and a file-backed database
like SQLite will corrupt under two concurrent writers.

Because of this, Helix deploys **in place**: when you push a new commit (or
click **Deploy now**), Helix **stops the running app before starting the new
one**, so `/data` is only ever opened by a single process. This means:

- A deploy causes a **brief restart window of downtime** while the app
  restarts. This is expected and is the safe trade-off for stateful apps.
- If the new version fails to start (its port never comes up), Helix **rolls
  back** to the previously-live commit so your site returns to its last known
  good state — against the same intact `/data`.

> **Need zero-downtime blue/green deploys or horizontal scaling?** That is not
> what built-in web service hosting provides, and it cannot be made safe on a
> single shared data directory. Point Helix at an **external Kubernetes
> cluster** instead — the cluster handles deploy strategy, replicas, and
> storage (PVCs / managed databases) properly.

## Runner pinning and durability limits

Your web service runs on a single Helix **runner**, and its `/data` directory
lives on **that runner's local disk**. Helix **pins** the service to its runner:

- It survives the **container or sandbox restarting** — `/data` is re-mounted.
- It survives the **runner rebooting** — the data is on the runner's local disk
  and Helix re-binds the service to the same runner.
- Helix will **not** silently move the service to a different runner. If the
  pinned runner is offline, a deploy **fails loudly** rather than bringing the
  service up empty somewhere else.

The runner a service is pinned to is shown in **Project Settings → Web Service**.

{{< warn title="Important: single-runner durability" >}}
Pinning protects against reschedules and reboots, but the data is only stored
on **one runner's local disk**. If that runner is **permanently lost**, the
data is lost with it. There is no built-in replication or backup yet — if your
data is important, take your own backups (for example, dump the database to
object storage from your startup script or a cron job).
{{< /warn >}}
