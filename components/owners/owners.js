'use strict'

var config = require('../../config'),
AWS = require('aws-sdk');

// Initialize Config
config.Init.initConfig();

module.exports.api = function (event, context, callback) {
    var response = {};
    var method = event.httpMethod;
    context.config = config.Init.getConfig();
    context.util = config.Util;
    context.AWS = AWS;
    try {
        require('./owners.' + method)(event, context, callback);
    } catch (e) {
        console.log(e);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error calling function for '+method+' '+event.resource,
                input: JSON.parse(event.body),
                output: e
            })
        }
        callback(null, response);
    }
};


