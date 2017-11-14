'use strict';

var paw = require('../models/paws').model,
    AWS = require('aws-sdk');

var pawsMetadataGET = function (event, context, callback) {
    var response = {};

    var pawId = event.pathParameters.id;
    paw.scan('pawId').eq(pawId)
        .attributes(['name', 'type', 'picture', 'owner'])
        .exec(function (err, found_paw) {
            // if err then pawId does not belong to cognito identity in context
            if (err) {
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: 'GET: ' + event.pathParameters.id + ' failed!',
                        input: event.pathParameters.id,
                        output: err
                    })
                }
                callback(null, response);
            } else if (found_paw.length === 0) {
                // Resrouce does not exist!
                response = {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: 'GET: ' + event.pathParameters.id + ' failed as resource does not exist!',
                        input: event.pathParameters.id,
                        output: event.pathParameters.id + ' does not exist.'
                    })
                }
                callback(null, response);
            } else {
                // Delete successful!
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'GET: ' + event.pathParameters.id + ' successful!',
                        input: event.pathParameters.id,
                        output: found_paw
                    })
                }
                callback(null, response);
            }
        })
}

module.exports = pawsMetadataGET;