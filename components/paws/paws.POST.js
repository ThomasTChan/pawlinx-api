'use strict';

var paw = require('./models/paws').model,
    AWS = require('aws-sdk');

var pawsPOST = function (event, context, callback) {
    var response = {};
    var body = JSON.parse(event.body);
    var request = new paw(body);
    request.save(function (err) {
        if (err) {
            console.log('Save Error: ', err);
            response = {
                statusCode: 500,
                body: {
                    message: err,
                    input: body
                }
            }
        } else {
            response = {
                statusCode: 200,
                body: {
                    message: 'Saved Paw!',
                    input: body
                }
            };
        }
        callback(null, response);
    })
}

module.exports = pawsPOST;