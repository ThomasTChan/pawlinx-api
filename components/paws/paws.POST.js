'use strict';

var uuid = require('uuid/v1'),
    Q = require('q');

var pawsPOST = function (event, context, callback) {
    var response = {},
        body = JSON.parse(event.body),
        request = new context.paw.model(body),
        AWS = context.AWS,
        cognitoIdentityId = event.requestContext.identity.cognitoIdentityId,
        cognitoIdentityPoolId = event.requestContext.identity.cognitoIdentityPoolId;

    context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
        context.ownerUtils.checkBeaconIdOwner(request.beaconId,data.accountId).then(function(beaconIds){
            context.ownerUtils.getOwnerId(data.accountId).then(function (owner_uuid) {
                context.pawUtils.getPawId(data.accountId,request.beaconId).then(function(pawId){
                    request.accountId = data.accountId;            
                    request.pawId = pawId;
                    request.ownerId = owner_uuid;
                    request.save(function (err) {
                        if (err) {
                            response = {
                                statusCode: 500,
                                body: JSON.stringify({
                                    message: 'POST failed!',
                                    input: body,
                                    output: err
                                })
                            }
                            console.log('Save Error: ', response);
                        } else {
                            response = {
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: 'POST successful!',
                                    input: body,
                                    output: request
                                })
                            };
                            console.log('Saved Paw!', response);
                        }
                        callback(null, response);
                    })
                },function(getPawIdError){
                    response = {
                        statusCode: 500,
                        body: JSON.stringify({
                            message: 'POST failed!',
                            input: body,
                            output: getPawIdError
                        }),
                    };
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
        },function(checkBeaconIdErr){
            response = {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'POST failed!',
                    input: body,
                    output: checkBeaconIdErr
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

}

module.exports = pawsPOST;