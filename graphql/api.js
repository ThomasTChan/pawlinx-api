'use strict';

var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
var schema = require('./paws/schema').schema;
var resolvers = require('./paws/resolvers').resolvers;

const server = require('apollo-server-lambda');

const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  logger: console,
});

module.exports.graphqlHandler = function graphqlHandler(event, context, callback) {
  function callbackFilter(error, output) {
    // eslint-disable-next-line no-param-reassign
    output.headers['Access-Control-Allow-Origin'] = '*';
    callback(error, output);
  }

  const handler = server.graphqlLambda({ schema: myGraphQLSchema });
  return handler(event, context, callbackFilter);
};

// for local endpointURL is /graphql and for prod it is /stage/graphql
module.exports.graphiqlHandler = server.graphiqlLambda({ endpointURL: process.env.GRAPHQL_ENDPOINT ? process.env.GRAPHQL_ENDPOINT : '/production/graphql' });
