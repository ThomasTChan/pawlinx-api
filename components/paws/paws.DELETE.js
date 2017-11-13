'use strict';

var paw = require('./models/paws').model;

var pawsPUT = function (event, context, callback) {
    var response = {},
        AWS = context.AWS,
        cognitoIdentityId = event.requestContext.identity.cognitoIdentityId,
        cognitoIdentityPoolId = event.requestContext.identity.cognitoIdentityPoolId;

    // Check if id belongs to cognito identity in context
    context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
        paw.queryOne('accountId').eq(data.accountId)
            .where('pawId')
            .eq(event.pathParameters.id)
            .exec(function (err, found_paw) {
                // if err then pawId does not belong to cognito identity in context
                if (err) {
                    response = {
                        statusCode: 500,
                        body: JSON.stringify({
                            message: 'DELETE: ' + event.pathParameters.id + ' failed!',
                            input: event.pathParameters.id,
                            output: err
                        })
                    }
                    callback(null, response);
                } else if (typeof found_paw === 'undefined') {
                    // Resrouce does not exist!
                    response = {
                        statusCode: 404,
                        body: JSON.stringify({
                            message: 'DELETE: ' + event.pathParameters.id + ' failed as resource does not exist!',
                            input: event.pathParameters.id,
                            output: event.pathParameters.id + ' does not exist for logged in account.'
                        })
                    }
                    callback(null, response);
                } else {
                    found_paw.delete(function (del_err) {
                        if (del_err) {
                            response = {
                                statusCode: 500,
                                body: JSON.stringify({
                                    message: 'DELETE: ' + event.pathParameters.id + ' failed!',
                                    input: event.pathParameters.id,
                                    output: del_err
                                })
                            }
                            callback(null, response);
                        } else {
                            // Delete successful!
                            response = {
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: 'DELETE: ' + event.pathParameters.id + ' successful!',
                                    input: event.pathParameters.id,
                                    output: found_paw
                                })
                            }
                            callback(null, response);
                        }
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
                input: event.pathParameters.id
            })
        };
        callback(null, response);
    })
}

module.exports = pawsPUT;