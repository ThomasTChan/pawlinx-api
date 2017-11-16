var Owners = require('../../components/owners/models/owners').model,
  Q = require("q");

var ownerQuery = function (root, args, context) {
  var deferred = Q.defer(),
    promise = deferred.promise,
    cognitoIdentityId = context.event.requestContext.identity.cognitoIdentityId,
    cognitoIdentityPoolId = context.event.requestContext.identity.cognitoIdentityPoolId,
    ownerId = args.ownerId || root.ownerId;

  context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
    Owners.get({
      accountId: data.accountId,
      ownerId: ownerId
    }, function (err, owner) {
      if (err) {
        deferred.reject(err);
      } else if (typeof owner === 'undefined') {
        deferred.reject('Owner with id: ' + ownerId + ' not found!');
      } else {
        deferred.resolve(owner)
      }
    })
  }, function (error) {
    deferred.reject('Cognito Identity Error: ' + error);
  })
  return promise;
}

var ownerMetadataQueryByBeaconId = function (root, args, context) {
  var deferred = Q.defer(),
  promise = deferred.promise,
  beaconId = args.beaconId || root.beaconId;

  Owners.scan('beaconId').in(beaconId)
  .attributes(['name','picture'])
  .exec(function (err, owner) {
    // if err then pawId does not belong to cognito identity in context
    if (err) {
      deferred.reject(err);
    } else if (owner.length === 0) {
      // Resource does not exist!
      deferred.reject('Owner not found for beacon: ' + beaconId);
    } else {
      deferred.resolve(owner);
    }
  })

  return promise;
}

module.exports = {
  ownerQuery: ownerQuery,
  ownerMetadataQueryByBeaconId: ownerMetadataQueryByBeaconId
}
