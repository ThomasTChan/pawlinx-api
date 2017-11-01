'use strict';

var paw = require('./models/paws').model,
    uuid = require('uuid/v1');

var pawsPOST = function (event, context, callback) {
    var response = {},
        body = JSON.parse(event.body),
        request = new paw(body),
        AWS = context.AWS,
        cognitoIdentityId = event.requestContext.identity.cognitoIdentityId,
        cognitoIdentityPoolId = event.requestContext.identity.cognitoIdentityPoolId;    

    context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
        request.accountId = data.accountId;
        request.beaconId = data.beaconId;
        request.pawId = uuid();
        request.save(function (err) {
            if (err) {
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: err,
                        input: body
                    })
                }
                console.log('Save Error: ', response);
            } else {
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'Saved Paw!',
                        input: body,
                        result: request
                    })
                };
                console.log('Saved Paw!', response);
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

}

module.exports = pawsPOST;