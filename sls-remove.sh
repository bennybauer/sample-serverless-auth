#!/bin/bash

echo "Are you sure you want to remove the service & all resources?(y/N)"
read answer

if [ -n "${answer// }" ] && [ $answer == "y" ]; then
    # read configuration from serverless.yml
    WEB_BUCKET=s3://$(cat serverless.yml | shyaml get-value provider.custom.WEB_BUCKET)
    echo "Emptying bucket $WEB_BUCKET..."
    aws s3 rm $WEB_BUCKET --recursive
    
    echo "Calling sls remove..."
    sls remove

    echo "Deleting bucket $WEB_BUCKET..."
    aws s3 rb $WEB_BUCKET --force  
fi
