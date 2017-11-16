'use strict';

var AWS = require('aws-sdk');

var pawsMetadataGET = function (event, context, callback) {
    var response = {},
        attribute = '',
        filterValue = '',
        paw = context.paw.model;

    var pawId = event.pathParameters.pawId,
        beaconId = event.pathParameters.beaconId;

    // if pawId exists, then get metadata by single pawId
    if(pawId){
        attribute = 'pawId';
        filterValue = pawId;
    }

    // if beaconId exists, then get metadata by single beaconId
    if(beaconId){
        attribute = 'beaconId';
        filterValue = beaconId;
    }

    paw.scan(attribute).eq(filterValue)
        .attributes(['name', 'type', 'picture', 'owner'])
        .exec(function (err, found_paw) {
            // if err then pawId does not belong to cognito identity in context
            if (err) {
                response = {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: 'GET: ' + filterValue + ' failed!',
                        input: filterValue,
                        output: err
                    })
                }
                callback(null, response);
            } else if (found_paw.length === 0) {
                // Resrouce does not exist!
                response = {
                    statusCode: 404,
                    body: JSON.stringify({
                        message: 'GET: ' + filterValue + ' failed as resource does not exist!',
                        input: filterValue,
                        output: filterValue + ' does not exist.'
                    })
                }
                callback(null, response);
            } else {
                // Delete successful!
                response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: 'GET: ' + filterValue + ' successful!',
                        input: filterValue,
                        output: found_paw
                    })
                }
                callback(null, response);
            }
        })
}

module.exports = pawsMetadataGET;