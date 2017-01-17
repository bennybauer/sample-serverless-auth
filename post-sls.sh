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

# read configuration from serverless.yml
WEB_BUCKET=s3://$(cat serverless.yml | shyaml get-value provider.custom.WEB_BUCKET)

# get lambda endpoint
# $API_URL = sls info | grep |

# sync static files
echo "Syncing html to $WEB_BUCKET..."
aws s3 sync html $WEB_BUCKET --exclude "package.json "