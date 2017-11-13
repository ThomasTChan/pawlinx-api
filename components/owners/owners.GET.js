'use strict';

var dynamoose = require('dynamoose'),
    owner = require('./models/owners').model;

var ownersGET = function (event, context, callback) {
    var response = {},
        cognitoIdentityId = event.requestContext.identity.cognitoIdentityId,
        cognitoIdentityPoolId = event.requestContext.identity.cognitoIdentityPoolId;

    context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
        owner.query({
            accountId: {
                eq: data.accountId
            }
        }, function (err, owners) {
            if (err) {
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: 'GET: ' + data.accountId + ' failed!',
                        output: err
                    })
                };
                console.log('Error!', response)
            } else if (typeof owners === 'undefined') {
                 // Resource does not exist!
                 response = {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: 'GET: ' + data.accountId + ' failed as resource does not exist!',
                        output: 'User is not logged in'
                    })
                }
            } else {
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'GET: ' + data.accountId + ' successful!',
                        output: owners
                    })
                };
                console.log('Success!', response)
            }
            callback(null, response);
        })
    }, function (error) {
        console.log(error);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Cognito Identity Error: ' + error.msg,
                errors: error.errors
            })
        };
        callback(null, response);
    })  
};

module.exports = ownersGET;