#!/bin/bash
set -euo pipefail

# Project startup script
# This runs when agents start working on this project

echo "🚀 Starting project: docs"

# Hugo version required by the docs project
HUGO_VERSION="0.147.0"

# Install Hugo if not already correct version
CURRENT_HUGO=$(hugo version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1 || echo "")
if [ "$CURRENT_HUGO" != "$HUGO_VERSION" ]; then
  echo "Installing Hugo ${HUGO_VERSION} extended..."
  curl -sL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" | tar xz -C /tmp
  sudo mv /tmp/hugo /usr/local/bin/hugo
  echo "Hugo version: $(hugo version)"
else
  echo "Hugo ${HUGO_VERSION} already installed"
fi

# Install npm dependencies for docs project
echo "Installing npm dependencies..."
cd /home/retro/work/docs
npm install

echo "✅ Project startup complete"
