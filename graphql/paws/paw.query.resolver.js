var Paws = require('../../components/paws/models/paws').model,
  Q = require("q");

var pawQuery = function (root, args, context) {
  var deferred = Q.defer(),
    promise = deferred.promise,
    cognitoIdentityId = context.event.requestContext.identity.cognitoIdentityId,
    cognitoIdentityPoolId = context.event.requestContext.identity.cognitoIdentityPoolId,
    pawId = args.pawId || root.pawId;

  context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
    Paws.get({
      accountId: data.accountId,
      pawId: pawId
    }, function (err, paw) {
      if (err) {
        deferred.reject(err);
      } else if (typeof paw === 'undefined') {
        deferred.reject('Paw with id: ' + pawId + ' not found!');
      } else {
        deferred.resolve(paw)
      }
    })
  }, function (error) {
    deferred.reject('Cognito Identity Error: ' + error);
  })
  return promise;
}

var pawQueryByOwnerId = function (root, args, context) {
  var deferred = Q.defer(),
    promise = deferred.promise,
    cognitoIdentityId = context.event.requestContext.identity.cognitoIdentityId,
    cognitoIdentityPoolId = context.event.requestContext.identity.cognitoIdentityPoolId;

  context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {

    Paws.scan('accountId').eq(data.accountId)
      .where('ownerId')
      .eq(root.ownerId)
      .exec(function (err, found_paws) {
        // if err then pawId does not belong to cognito identity in context
        if (err) {
          deferred.reject(err);
        } else if (found_paws.length === 0) {
          // Resrouce does not exist!
          deferred.reject('Paws with ownerid: ' + root.ownerId + ' not found!');
        } else {
          deferred.resolve(found_paws);
        }
      })
  }, function (error) {
    deferred.reject('Cognito Identity Error: ' + error);
  })
  return promise;
}

module.exports = {
  pawQuery: pawQuery,
  pawQueryByOwnerId: pawQueryByOwnerId
}
