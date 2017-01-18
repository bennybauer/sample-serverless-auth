#!/bin/bash

# install aws cli
if [ -z $(which aws) ]; then
    echo "Installing aws cli..."
    pip install awscli
fi

# install shyaml (yaml parser for bash)
if [ -z $(which shyaml) ]; then
    echo "Installing shyaml..."
    pip install shyaml
fi

# install jq (json parser for bash)
if [ -z $(which jq) ]; then
    echo "Installing jq..."
    brew install jq
fi

# read configuration from serverless.yml
WEB_BUCKET=s3://$(cat serverless.yml | shyaml get-value provider.custom.WEB_BUCKET)

# update api endpoint in config file
echo "Updating service endpoint in config file..."
API_URL=$(sls info -v | grep ServiceEndpoint | awk '{print $2}')
echo $(jq --arg api_url "$API_URL" '.apiUrl|="\($api_url)"' html/js/config.json) > html/js/config.json 

# sync static files
echo "Syncing html to $WEB_BUCKET..."
aws s3 sync html $WEB_BUCKET --exclude "package.json "

# display website url
WEB_URL=$(sls info -v | grep WebsiteURL | awk '{print $2}')
echo
echo "Website: $WEB_URL"
echo "API endpoint: $API_URL"
