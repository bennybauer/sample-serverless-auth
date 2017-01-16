'use strict';

const AWS = require('aws-sdk');
const crypto = require('crypto');
const cryptoUtils = require('./lib/cryptoUtils');

const dynamodb = new AWS.DynamoDB();
const ses = new AWS.SES();

module.exports.create = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const email = body.email;
  cryptoUtils.computeHash(body.password, (err, salt, hash) => {
    if (err) callback(`Error in hash: ${err}`);
    else {
      storeUser(email, hash, salt, (err, token) => {
        if (err) {
          console.error(err);
          if (err.code == 'ConditionalCheckFailedException') {
            console.log(`userId '${email}' already found`)
            // userId already found
            callback(null, {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({ created: false })
            });
          } else {
            callback(`Error in storeUser: ${err}`);
          }
        } else {
          sendVerificationEmail(email, token, (err, data) => {
            if (err) callback(`Error in sendVerificationEmail: ${err}`);
            else callback(null,  {
              statusCode: 200,
              headers: {
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({ created: true })
            });
          });
        }
      });
    }
  });
};

function storeUser(email, password, salt, fn) {
  const len = 128;
  crypto.randomBytes(len, (err, token) => {
    if (err) return fn(err);
    token = token.toString('hex');
    dynamodb.putItem({
      TableName: process.env.USERS_TABLE,
      Item: {
        email: {
          S: email
        },
        passwordHash: {
          S: password
        },
        passwordSalt: {
          S: salt
        },
        verified: {
          BOOL: false
        },
        verifyToken: {
          S: token
        }
      },
      ConditionExpression: 'attribute_not_exists (email)'
    }, (err, data) => {
      if (err) return fn(err);
      else fn(null, token);
    });
  });
}

function sendVerificationEmail(email, token, fn) {
  const subject = `Verification email for ${process.env.EXTERNAL_NAME}`;
  const verificationLink = `${process.env.VERIFICATION_PAGE}?email=${encodeURIComponent(email)}&verify=${token}`;
  ses.sendEmail({
    Source: process.env.EMAIL_RESOURCE,
    Destination: {
      ToAddresses: [
        email
      ]
    },
    Message: {
      Subject: {
        Data: subject
      },
      Body: {
        Html: {
          Data: `<html><head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>${subject}</title></head>
          <body>
            Please <a href="${verificationLink}">click here</a> to verify your email address
          </body></html>`
        }
      }
    }
  }, fn);
}
