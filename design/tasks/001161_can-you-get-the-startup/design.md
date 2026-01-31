# Design: Helix Project Startup Script

## Overview

Configure the `helix-specs/.helix/startup.sh` script to install the dependencies needed to work on the docs project.

## Architecture

No complex architecture. The startup script installs:
1. Hugo 0.147.0 extended
2. npm dependencies

## Key Decisions

### 1. Install Hugo using the same method as `pages-deploy.sh`
**Rationale:** The Cloudflare deployment script already has working Hugo installation logic. Reuse it.

### 2. Run npm install in the docs directory
**Rationale:** The docs project has tailwindcss/postcss dependencies that must be installed.

## Discovered Patterns

- Hugo version 0.147.0 extended is required (from `docs/hugo.yaml` and `docs/scripts/pages-deploy.sh`)
- The `pages-deploy.sh` downloads Hugo from GitHub releases to `/tmp` - this pattern works
- npm dependencies are defined in `docs/package.json`

## Implementation Notes

The startup script should:
1. Download and install Hugo 0.147.0 extended to a location in PATH
2. Run `npm install` in the docs directory

## Implementation Notes

- Adapted Hugo installation logic from `docs/scripts/pages-deploy.sh`
- Used `sudo mv /tmp/hugo /usr/local/bin/hugo` to make Hugo available system-wide (more reliable than modifying PATH)
- Added version check to skip reinstallation if correct version already exists (idempotent)
- Script uses absolute path `/home/retro/work/docs` for npm install since the script runs from helix-specs directory