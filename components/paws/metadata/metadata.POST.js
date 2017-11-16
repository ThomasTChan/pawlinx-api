'use strict';

var AWS = require('aws-sdk');

var pawsMetadataPOST = function (event, context, callback) {
    var response = {},
        paw = context.paw.model,
        body = JSON.parse(event.body);

    var pawIds = JSON.parse(event.body).pawIds;
    paw.scan('pawId').in(pawIds)
        .attributes(['name', 'type', 'picture', 'owner'])
        .exec(function (err, paws) {
            // if err then pawId does not belong to cognito identity in context
            if (err) {
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: 'POST failed!',
                        input: body,
                        output: err
                    })
                }
                callback(null, response);
            } else if (paws.length === 0) {
                // Resrouce does not exist!
                response = {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: 'POST failed as resource does not exist!',
                        input: body,
                        output: 'No matches found!'
                    })
                }
                callback(null, response);
            } else {
                // Delete successful!
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'POST successful!',
                        input: body,
                        output: paws
                    })
                }
                callback(null, response);
            }
        })
}

module.exports = pawsMetadataPOST;