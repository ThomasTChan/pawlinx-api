'use strict'

var db = require('dynamoose');

// Use environment variable STAGE set from serverless.yml
module.exports.DEPLOYMENT_STAGE = process.env.STAGE || 'default';
module.exports.GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || '/graphql'
module.exports.DB = db;