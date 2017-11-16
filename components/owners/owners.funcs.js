(function () {
    'use strict'

    var owner = require('./models/owners').model,
        uuid = require('uuid/v1'),
        Q = require('q');

    module.exports.checkBeaconIdOwner = function (beaconId, accountId) {
        var deferred = Q.defer(),
            promise = deferred.promise;

        owner.query('accountId').eq(accountId)
            .attributes(['beaconId'])
            .where('beaconId')
            .eq(beaconId)
            .exec(function (err, owners) {
                if (err) {
                    deferred.reject(err);
                } else if (owners.length === 0) {
                    // Resource does not exist user has no associated beacons
                    deferred.reject(false);
                } else {
                    // Resource exists, beaconId belongs to user
                    deferred.resolve(true);
                }
            })

        return promise;
    }

    module.exports.getOwnerId = function (accountId) {
        var deferred = Q.defer(),
            promise = deferred.promise;
    
        owner.query('accountId').eq(accountId)
            .attributes(['ownerId'])
            .exec(function (err, owners) {
                if (err) {
                    deferred.reject(err);
                } else if (owners.length === 0) {
                    // Resource does not exist, create new UUID
                    deferred.resolve(uuid());
                } else {
                    // Resource exists, return UUID
                    deferred.resolve(owners[0].ownerId);
                }
            })
    
        return promise;
    }

})()