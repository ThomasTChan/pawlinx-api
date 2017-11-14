'use strict';

var owner = require('../models/owners').model,
    AWS = require('aws-sdk');

var ownersMetadataPOST = function (event, context, callback) {
    var response = {},
        body = JSON.parse(event.body);

    var ownerIds = JSON.parse(event.body).ownerIds;
    owner.scan('ownerId').in(ownerIds)
        .attributes(['name', 'picture'])
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

module.exports = ownersMetadataPOST;