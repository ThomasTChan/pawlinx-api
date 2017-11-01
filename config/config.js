'use strict'

var db = require('dynamoose');

// Use environment variable STAGE set from serverless.yml
module.exports.COGNITO_REGION = process.env.COGNITO_REGION || 'klfjasdklfj';
module.exports.DEPLOYMENT_STAGE = process.env.STAGE || 'default';
module.exports.GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || '';
module.exports.EXECUTION_ROLE = process.env.EXECUTION_ROLE || 'LOCAL';
module.exports.DB = db;

// Config for local dynamodb instance
module.exports.DYNAMODB_CONFIG_LOCAL = {
    url: 'http://localhost',
    port: 8000,
    AWS: {        
        region: 'ca-central-1'
    }
}