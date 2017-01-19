'use strict';

const AWS = require('aws-sdk');
const responseUtils = require('./lib/responseUtils');

const dynamodb = new AWS.DynamoDB();

function getUser(email, callback) {
  dynamodb.getItem({
    TableName: process.env.USERS_TABLE,
    Key: {
      email: {
        S: email,
      },
    },
  }, (err, data) => {
    if (err) return callback(err);

    if ('Item' in data) {
      const verified = data.Item.verified.BOOL;
      let verifyToken = null;

      if (!verified) {
        verifyToken = data.Item.verifyToken.S;
      }

      callback(null, verified, verifyToken);
    } else {
      callback(null, null);
    }
  });
}

function updateUser(email, callback) {
  dynamodb.updateItem({
    TableName: process.env.USERS_TABLE,
    Key: {
      email: {
        S: email,
      },
    },
    AttributeUpdates: {
      verified: {
        Action: 'PUT',
        Value: {
          BOOL: true,
        },
      },
      verifyToken: {
        Action: 'DELETE',
      },
    },
  }, callback);
}

module.exports.verify = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const email = body.email.toLowerCase();
  const verifyToken = body.verify;

  getUser(email, (err, verified, correctToken) => {
    if (err) callback(`Error in getUser: ${err}`);
    else if (verified) {
      console.log(`User already verified: ${email}`);
      callback(null, responseUtils.generateResponse({
        verified: true,
      }));
    } else if (verifyToken === correctToken) {
      updateUser(email, (err2) => {
        if (err2) callback(`Error in updateUser: ${err}`);
        else {
          console.log(`User verified: ${email}`);
          callback(null, responseUtils.generateResponse({
            verified: true,
          }));
        }
      });
    } else {
      console.log(`User not verified: ${email}`);
      callback(null, responseUtils.generateResponse({
        verified: false,
      }));
    }
  });
};
