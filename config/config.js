'use strict'

var db = require('dynamoose');

// Use environment variable STAGE set from serverless.yml
module.exports.DEPLOYMENT_STAGE = process.env.STAGE || 'default';
module.exports.DB = db;