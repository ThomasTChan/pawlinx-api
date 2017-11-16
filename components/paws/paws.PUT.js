'use strict';

var pawsPUT = function (event, context, callback) {
    var response = {},
        body = JSON.parse(event.body),
        request = new paw(body),
        AWS = context.AWS,
        paw = context.paw.model,
        cognitoIdentityId = event.requestContext.identity.cognitoIdentityId,
        cognitoIdentityPoolId = event.requestContext.identity.cognitoIdentityPoolId;

    // Override any request changes to pawId
    request.pawId = event.pathParameters.pawId;

    // Check if id belongs to cognito identity in context
    context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
        paw.queryOne({
            accountId: {
                eq: data.accountId
            },
            pawId: {
                eq: event.pathParameters.pawId
            }
        }, function (err, paw) {
            // if err then pawId does not belong to cognito identity in context
            if (err) {
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: err,
                        input: body
                    })
                }
                callback(null, response);
            } else {
                request.accountId = data.accountId;
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
                                input: body
                            })
                        };
                        console.log('Saved Paw!', response);
                    }
                    callback(null, response);
                })
            }
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

module.exports = pawsPUT;