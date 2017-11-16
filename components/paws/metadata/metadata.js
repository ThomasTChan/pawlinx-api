'use strict'

var config = require('../../../config'),
    validator = require('validator'),
    AWS = require('aws-sdk');

// Initialize Config
config.Init.initConfig();

var pawModel = require('../models/paws'),
    pawUtils = require('../paws.funcs');

module.exports.api = function (event, context, callback) {
    var response = {};
    var method = event.httpMethod;
    if (event.body) {
        event.body = validator.blacklist(event.body, ';')
    }
    context.config = config.Init.getConfig();
    context.util = config.Util;
    context.pawUtils = pawUtils;
    context.paw = pawModel;
    context.AWS = AWS;
    try {
        require('./metadata.' + method)(event, context, callback);
    } catch (e) {
        console.log(e);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error calling function for ' + method + ' ' + event.resource,
                input: JSON.parse(event.body),
                output: e
            })
        }
        callback(null, response);
    }
};


