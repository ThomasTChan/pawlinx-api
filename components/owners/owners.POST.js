'use strict';

var dynamoose = require('dynamoose'),
    uuid = require('uuid'),
    owner = require('./models/owners').model,
    Q = require('q');

function getOwnerId(accountId) {
    var deferred = Q.defer(),
        promise = deferred.promise;

    owner.query('accountId').eq(accountId)
        .attributes(['ownerId'])
        .exec(function (err, owners) {
            if (err) {
                deferred.reject(err);
            } else if (owners.length === 0) {
                // Resource does not exist, create new UUID
                deferred.resolve(uuid());
            } else {
                // Resource exists, return UUID
                deferred.resolve(owners[0].ownerId);
            }
        })

    return promise;
}

var ownersPOST = function (event, context, callback) {
    var response = {},
        body = JSON.parse(event.body),
        request = new owner(body),
        AWS = context.AWS,
        cognitoIdentityId = event.requestContext.identity.cognitoIdentityId,
        cognitoIdentityPoolId = event.requestContext.identity.cognitoIdentityPoolId;

    context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
        getOwnerId(data.accountId).then(function (owner_uuid) {
            request.accountId = data.accountId;
            request.beaconId = data.beaconId;
            request.ownerId = owner_uuid;
            request.save(function (err) {
                if (err) {
                    console.log('Save Error: ', err);
                    response = {
                        statusCode: 500,
                        body: JSON.stringify({
                            message: 'POST failed!',
                            input: body,
                            output: err
                        })
                    }
                } else {
                    response = {
                        statusCode: 200,
                        body: JSON.stringify({
                            message: 'POST successful!',
                            input: body,
                            output: request
                        }),
                    };
                }
                callback(null, response);
            })
        }, function (getOwnerError) {
            response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'POST failed!',
                    input: body,
                    output: getOwnerError
                }),
            };
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