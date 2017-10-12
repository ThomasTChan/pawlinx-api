// Initialize database configs
require('../config').Init.initConfig();
var Paws = require('../components/paws/models/paws').model,
  Q = require("q");

var pawQuery = function (root, args) {
  var deferred = Q.defer(),
    promise = deferred.promise;

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
