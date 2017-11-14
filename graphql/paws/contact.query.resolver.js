var Q = require("q");

var contactQuery = function (root, args, context) {
    var deferred = Q.defer(),
        promise = deferred.promise;

    deferred.resolve(root.contact);

    return promise;
}


module.exports.contactQuery = contactQuery;