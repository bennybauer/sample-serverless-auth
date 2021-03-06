# Sample Authorization Service
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f7dff34a9f5d46a2ad868456954e2d24)](https://www.codacy.com/app/bennybauer/serverless-auth-sample?utm_source=github.com&utm_medium=referral&utm_content=bennybauer/serverless-auth-sample&utm_campaign=badger)
[![Build Status](https://travis-ci.org/bennybauer/serverless-auth-sample.svg?branch=master)](https://travis-ci.org/bennybauer/serverless-auth-sample)
[![Coverage Status](https://coveralls.io/repos/github/bennybauer/serverless-auth-sample/badge.svg?branch=master)](https://coveralls.io/github/bennybauer/serverless-auth-sample?branch=master)

A sample authorization service based on the [AWS Lambda in Action](https://www.manning.com/books/aws-lambda-in-action) sample. 
This service however, doesn't invoke lambda directly from the client (using AWS Congnito identity pools) but through AWS API Gateway.
a [`post-sls.sh`](post-sls.sh) script is used for automating the static content deployment.

# Usage
1. Set up AWS account.
1. Install aws cli: `pip install awscli`
1. Configure AWS credentials: `aws configure`
1. Set up dns for your domain. You can use Route 53.
1. Set up SES for your domain.
1. Install Severless Framework: `npm i -g serverless`
1. Configure all relevant variables in `serverless.yml`
1. Deploy: `sls deploy`
1. Update static html: `./post-sls.sh`

## How to delete the service
`./sls-remove.sh`