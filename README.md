# Sample Authorization Service

# Usage

1. Set up AWS account.
1. Install aws cli: `pip install awscli`
1. Configure AWS credentials: `aws configure`
1. Set up dns for your domain. You use Route 53.
1. Set up SES for your domain.
1. Install Severless Framework: `npm i -g serverless`
1. Configure all relevant variables in `serverless.yml`
1. Deploy: `sls deploy`
1. Update static html: `./post-sls.sh`
