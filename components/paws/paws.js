'use strict'

var config = require('../../config'),
    validator = require('validator'),
    AWS = require('aws-sdk');

// Initialize Config
config.Init.initConfig();

module.exports.api = function (event, context, callback) {
    var response = {};
    var method = event.httpMethod;
    if(event.body){
        event.body = validator.blacklist(event.body,';')
    }    
    context.config = config.Init.getConfig();
    context.util = config.Util;
    context.AWS = AWS;
    try {
        require('./paws.' + method)(event, context, callback);
    } catch (e) {
        console.log(e);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Method Not Implemented!',
                input: event.body
            })
        }
        callback(null, response);
    }
};


