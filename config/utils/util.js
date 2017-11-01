(function () {
    'use strict'
    var config = require('../config'),
        _ = require('lodash');

    module.exports.getAWSCognitoIdentityRecord = function (cognitoIdentityId, cognitoIdentityPoolId) {
        var Q = require('q'),
            deferred = Q.defer(),
            promise = deferred.promise,
            AWS = require('aws-sdk'),
            identityRecord = {};

        if (cognitoIdentityId === 'offlineContext_cognitoIdentityId') {
            identityRecord.accountId = cognitoIdentityId;
            identityRecord.beaconId = cognitoIdentityId + '_beaconId';
            deferred.resolve(identityRecord);
        }
        else {
            AWS.config.credentials.get(function () {
                var syncClient = new AWS.CognitoSync({
                    region: config.COGNITO_REGION
                });
                syncClient.listRecords({
                    DatasetName: 'account',
                    IdentityId: cognitoIdentityId,
                    IdentityPoolId: cognitoIdentityPoolId
                }, function (err, data) {
                    console.log('Getting Cognito Sync Data!');
                    if (err) {
                        console.log(err);
                        deferred.reject(err);
                    }
                    console.log(data);
                    var identityObject = _.find(data.Records, function(o) { return o.Key === 'identity'; });                    
                    identityRecord = JSON.parse(identityObject.Value)
                    deferred.resolve(identityRecord);
                })
            })
        }

        return promise;
    }

})();

