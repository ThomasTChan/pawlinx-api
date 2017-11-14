// Initialize database configs
require('../../config').Init.initConfig();
var pawQuery = require('./paw.query.resolver').pawQuery,
  ownerQuery = require('./owner.query.resolver').ownerQuery,
  contactQuery = require('./contact.query.resolver').contactQuery,
  Q = require("q");

module.exports.resolvers = {
  Query: {
    paw: pawQuery,
    owner: ownerQuery
  },
  Paw: {
    owner: ownerQuery
  },
  Owner: {
    contact: contactQuery
  }
};
