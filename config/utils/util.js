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
                    var errors = [];
                    if (err) {
                        console.log(err);
                        errors.push(err);
                        deferred.reject({
                            msg: "One or more missing values",
                            errors: errors
                        })
                    }           
                    var identityObject = _.find(data.Records, function(o) { return o.Key === 'identity'; });                                        
                    identityRecord = JSON.parse(identityObject.Value)                                                 
                    if(typeof identityRecord.accountId === 'undefined' || identityRecord.accountId.trim() === ''){
                        errors.push('accountId missing')
                    }
                    if(typeof identityRecord.beaconId === 'undefined' || identityRecord.beaconId.trim() === ''){
                        errors.push('beaconId missing')
                    }
                    if(errors.length > 0){
                        deferred.reject({
                            msg: "One or more missing values",
                            errors: errors
                        })
                    }
                    console.log(data);                    
                    deferred.resolve(identityRecord);
                })
            })
        }

        return promise;
    }

})();

