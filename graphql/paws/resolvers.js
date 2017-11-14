// Initialize database configs
require('../../config').Init.initConfig();
var Paws = require('../../components/paws/models/paws').model,
  Owners = require('../../components/owners/models/owners').model,
  Q = require("q");

var pawQuery = function (root, args, context) {
  var deferred = Q.defer(),
    promise = deferred.promise,
    cognitoIdentityId = context.event.requestContext.identity.cognitoIdentityId,
    cognitoIdentityPoolId = context.event.requestContext.identity.cognitoIdentityPoolId;

  context.util.getAWSCognitoIdentityRecord(cognitoIdentityId, cognitoIdentityPoolId).then(function (data) {
    Paws.get({
      accountId: data.accountId,
      pawId: args.pawId
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

var contactQuery = function (root, args, context) {
  var deferred = Q.defer(),
    promise = deferred.promise;

  deferred.resolve(root.contact);

  return promise;
}

module.exports.resolvers = {
  Query: {
    paw: pawQuery,
    owner: ownerQuery
  },
  Owner: {
    contact: contactQuery
  }
};
