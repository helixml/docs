# !/bin/bash

# This script is used by the cloudflare pages deployment:
# https://dash.cloudflare.com/f0150e619c6dc08f55aea6d2248b1c6c/pages/view/docs
#
# It depends on:
#   CF_PAGES_BRANCH to determine if the deployment is for staging or production.
#   CF_PAGES_URL to determine the base URL for staging deployments.
#
# The production baseURL is hardcoded to https://docs.helixml.tech

# Hugo version required by hextra theme
HUGO_VERSION="0.147.0"

# Install specific Hugo version if not already correct
CURRENT_HUGO=$(hugo version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)
if [ "$CURRENT_HUGO" != "$HUGO_VERSION" ]; then
  echo "Installing Hugo ${HUGO_VERSION}..."
  curl -sL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" | tar xz -C /tmp
  export PATH="/tmp:$PATH"
  echo "Hugo version: $(hugo version)"
fi

BASE_URL=$CF_PAGES_URL
ENVIRONMENT=staging
OPTIONS=""

if [ "$CF_PAGES_BRANCH" == "main" ]; then
  BASE_URL="https://docs.helixml.tech"
  ENVIRONMENT=production
  OPTIONS="--gc --minify"
fi

# Checkout https://github.com/helixml/kodit and copy over the docs folder to the content folder
echo "Checking out the kodit docs"
git clone https://github.com/helixml/kodit.git
cp -r kodit/docs/* content/kodit/
echo "Finished checking out the kodit docs"

# Install any npm deps
npm install

# Build once to rebuild the hugo_stats.json file if it doesn't exist
hugo

# Final build
hugo $OPTIONS --baseURL $BASE_URL --environment $ENVIRONMENT --destination public
