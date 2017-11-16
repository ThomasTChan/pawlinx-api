'use strict';

var _ = require('lodash');

var ownersMetadataPOST = function (event, context, callback) {
    var response = {},
        owner = context.owner.model,
        body = JSON.parse(event.body),
        ownerIds = body.ownerIds,
        beaconIds = body.beaconIds;

    if (ownerIds) {
        var ownerIds = JSON.parse(event.body).ownerIds;
        owner.scan('ownerId').in(ownerIds)
            .attributes(['name', 'picture'])
            .exec(function (err, owners) {
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
                } else if (owners.length === 0) {
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
                            output: owners
                        })
                    }
                    callback(null, response);
                }
            })
    } else if (beaconIds) {
        var ownersAggregate = [],
            searchedBeacons = [];

        _.each(beaconIds, function (id) {
            searchedBeacons.push(id);
            owner.scan('beaconIds').contains(id)
                .attributes(['name', 'picture'])
                .exec(function (err, owners) {
                    if (err) {
                        // do nothing
                    } else {
                        ownersAggregate = _.union(ownersAggregate, owners);
                    }
                    if (searchedBeacons.length === beaconIds.length) {
                        response = {
                            statusCode: 200,
                            body: JSON.stringify({
                                message: 'POST successful!',
                                input: body,
                                output: ownersAggregate
                            })
                        }
                        callback(null, response);
                    }
                    // // if err then pawId does not belong to cognito identity in context
                    // if (err) {
                    //     response = {
                    //         statusCode: 500,
                    //         body: JSON.stringify({
                    //             message: 'POST failed!',
                    //             input: body,
                    //             output: err
                    //         })
                    //     }
                    //     callback(null, response);
                    // } else if (owners.length === 0) {
                    //     // Resrouce does not exist!
                    //     response = {
                    //         statusCode: 404,
                    //         body: JSON.stringify({
                    //             message: 'POST failed as resource does not exist!',
                    //             input: body,
                    //             output: 'No matches found!'
                    //         })
                    //     }
                    //     callback(null, response);
                    // } else {
                    //     // Delete successful!
                    //     response = {
                    //         statusCode: 200,
                    //         body: JSON.stringify({
                    //             message: 'POST successful!',
                    //             input: body,
                    //             output: owners
                    //         })
                    //     }
                    //     callback(null, response);
                    // }
                })
        })
    }

}

module.exports = ownersMetadataPOST;