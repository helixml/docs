# !/bin/bash

# This script is used by the cloudflare pages deployment: 
# https://dash.cloudflare.com/f0150e619c6dc08f55aea6d2248b1c6c/pages/view/docs
# 
# It depends on:
#   CF_PAGES_BRANCH to determine if the deployment is for staging or production.
#   CF_PAGES_URL to determine the base URL for staging deployments.
#
# The production baseURL is hardcoded to https://docs.helixml.tech

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
