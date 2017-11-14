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


module.exports.pawQuery = pawQuery;
