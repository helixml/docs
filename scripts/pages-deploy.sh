# !/bin/bash

# This script is used by the cloudflare pages deployment: 
# https://dash.cloudflare.com/f0150e619c6dc08f55aea6d2248b1c6c/pages/view/docs
# 
# It depends on:
#   CF_PAGES_BRANCH to determine if the deployment is for staging or production.
#   CF_PAGES_URL to determine the base URL for staging deployments.
#
# The production baseURL is hardcoded to https://docs.helix.ml

BASE_URL=$CF_PAGES_URL
ENVIRONMENT=staging
OPTIONS=""

if [ "$CF_PAGES_BRANCH" == "main" ]; then
  BASE_URL="https://docs.helix.ml"
  ENVIRONMENT=production
  OPTIONS="--gc --minify"
fi

npm install && hugo $OPTIONS --baseURL $BASE_URL --environment $ENVIRONMENT --destination public
