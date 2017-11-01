'use strict';

var dynamoose = require('dynamoose'),
    uuid = require('uuid'),
    owner = require('./models/owners').model;

var ownersPOST = function (event, context, callback) {
    var response = {},
        request = new owner(JSON.parse(event.body)),
        AWS = context.AWS,
        cognitoIdentityId = event.requestContext.identity.cognitoIdentityId,
        cognitoIdentityPoolId = event.requestContext.identity.cognitoIdentityPoolId;

    context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
        request.accountId = data.accountId;
        request.beaconId = data.beaconId;
        request.save(function (err) {
            if (err) {
                console.log('Save Error: ', err);
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: err,
                        input: event.body
                    })
                }
            } else {
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'Saved Owner!',
                        input: event.body,
                    }),
                };
            }
            callback(null, response);
        })
    }, function (error) {
        console.log(error);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Cognito Identity Error: ' + error.msg,
                errors: error.errors,
                input: body
            })
        };
        callback(null, response);
    })


};

module.exports = ownersPOST;