var Owners = require('../../components/owners/models/owners').model,
  Q = require("q");

var ownerQuery = function (root, args, context) {
  var deferred = Q.defer(),
    promise = deferred.promise,
    cognitoIdentityId = context.event.requestContext.identity.cognitoIdentityId,
    cognitoIdentityPoolId = context.event.requestContext.identity.cognitoIdentityPoolId;

  context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
    Owners.get({
      accountId: data.accountId,
      ownerId: args.ownerId
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

module.exports.ownerQuery = ownerQuery;
