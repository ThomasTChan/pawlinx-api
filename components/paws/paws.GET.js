'use strict';

var pawsGET = function (event, context, callback) {
    var response = {},
        paw = context.paw.model,
        cognitoIdentityId = event.requestContext.identity.cognitoIdentityId,
        cognitoIdentityPoolId = event.requestContext.identity.cognitoIdentityPoolId;

    context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
        // Get all paws for account
        if (event.pathParameters === null) {
            paw.query({
                accountId: {
                    eq: data.accountId
                }
            }, function (err, paws) {
                if (err) {
                    response = {
                        statusCode: 500,
                        body: JSON.stringify({
                            message: 'Error Getting Paws for account: ' + data.accountId,
                            output: err
                        })
                    };
                    console.log('Error!', response)
                } else {
                    response = {
                        statusCode: 200,
                        body: JSON.stringify({
                            message: 'Success GET Paws for account: ' + data.accountId,
                            output: paws
                        })
                    };
                    console.log('Success!', response)
                }
                callback(null, response);
            })

        } else { // Get single paw for account
            var pawId = event.pathParameters.pawId;
            paw.get({
                accountId: data.accountId,
                pawId: pawId
            }, function (err, paws) {
                if (err) {
                    response = {
                        statusCode: 500,
                        body: JSON.stringify({
                            message: 'GET: ' + pawId + ' failed!',
                            output: err
                        })
                    };
                    console.log('Error!', response)
                } else if (typeof paws === 'undefined') {
                    // Resource does not exist!
                    response = {
                        statusCode: 404,
                        body: JSON.stringify({
                            message: 'GET: ' + pawId + ' failed as resource does not exist!',
                            output: pawId + ' does not exist for logged in account.'
                        })
                    }
                } else {
                    response = {
                        statusCode: 200,
                        body: JSON.stringify({
                            message: 'GET: ' + pawId + ' successful!',
                            output: paws
                        })
                    };
                    console.log('Success!', response)
                }
                callback(null, response);
            })
        }
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

module.exports = pawsGET;