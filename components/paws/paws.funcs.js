(function () {
    'use strict'

    var paw = require('./models/paws').model,
        uuid = require('uuid/v1'),
        Q = require('q');

    module.exports.getPawId = function (accountId,beaconId) {
        var deferred = Q.defer(),
            promise = deferred.promise;

        paw.scan('accountId').eq(accountId)
            .where('beaconId').eq(beaconId)
            .attributes(['pawId'])
            .exec(function (err, paws) {
                if (err) {
                    deferred.reject(err);
                } else if (paws.length === 0) {
                    // Resource does not exist, create new UUID
                    deferred.resolve(uuid());
                } else {
                    // Resource exists, return UUID
                    deferred.resolve(paws[0].pawId);
                }
            })

        return promise;
    }

})()