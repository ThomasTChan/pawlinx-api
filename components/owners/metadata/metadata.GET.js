'use strict';

var ownersMetadataGET = function (event, context, callback) {
    var response = {},
        owner = context.owner.model,
        attribute = '',
        filterValue = '';

    var ownerId = event.pathParameters.ownerId,
        beaconId = event.pathParameters.beaconId;

    // if pawId exists, then get metadata by single pawId
    if (ownerId) {
        attribute = 'ownerId';
        filterValue = ownerId;
    }

    // if beaconId exists, then get metadata by single beaconId
    if (beaconId) {
        attribute = 'beaconIds';
        filterValue = beaconId;
    }

    var scan = owner.scan(attribute);

    if (ownerId) {
        scan = scan.eq(filterValue);
    }

    if (beaconId) {
        scan = scan.contains(filterValue);
    }

    scan.attributes(['name', 'picture'])
        .exec(function (err, found_owner) {
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
            } else if (found_owner.length === 0) {
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
                        output: found_owner
                    })
                }
                callback(null, response);
            }
        })
}

module.exports = ownersMetadataGET;