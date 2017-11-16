// Initialize database configs
require('../../config').Init.initConfig();
var pawResolver = require('./paw.query.resolver'),  
  ownerResolver = require('./owner.query.resolver'),
  contactResolver = require('./contact.query.resolver'),
  Q = require("q");

module.exports.resolvers = {
  Query: {
    paw: pawResolver.pawQuery,
    pawMetadata: pawResolver.pawMetadataQueryByBeaconIds,
    owner: ownerResolver.ownerQuery
  },
  Paw: {
    owner: ownerResolver.ownerQuery
  },
  PawMetadata: {
    owner: ownerResolver.ownerMetadataQueryByBeaconId
  },  
  Owner: {
    paws: pawResolver.pawQueryByOwnerId,
    contact: contactResolver.contactQuery
  }
};
