// Initialize database configs
require('../../config').Init.initConfig();
var Paws = require('../../components/paws/models/paws').model,
  Q = require("q");

var pawQuery = function (root, args, context) {
  var deferred = Q.defer(),
    promise = deferred.promise,
    AWS = require('aws-sdk');

  AWS.config.credentials.get(function(){    
    var syncClient = new AWS.CognitoSync({
      region: 'us-east-1'
    });
    syncClient.listRecords({
      DatasetName: 'account',
      IdentityId: context.event.requestContext.identity.cognitoIdentityId,
      IdentityPoolId: context.event.requestContext.identity.cognitoIdentityPoolId
    },function(err, data){
      console.log('Getting Cognito Sync Data!');
      if(err){
        console.log(err);
      }
      console.log(data);
    })
  })

  Paws.query('dogId').eq(args.dogId).exec(function (err, paw) {
    console.log('paw returned', paw[0])
    if (err) {
      deferred.reject(err);
    }
    deferred.resolve(paw[0]);
  });
  return promise;
}

module.exports.resolvers = {
  Query: {
    paw: pawQuery
  },
};
