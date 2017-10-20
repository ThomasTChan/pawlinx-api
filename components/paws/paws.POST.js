'use strict';

var paw = require('./models/paws').model,
    AWS = require('aws-sdk');

var pawsPOST = function (event, context, callback) {
    var response = {};
    var body = JSON.parse(event.body);
    var request = new paw(body);
    request.save(function (err) {
        if (err) {            
            response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: err,
                    input: body
                })
            }
            console.log('Save Error: ', response);
        } else {            
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Saved Paw!',
                    input: body
                })
            };
            console.log('Saved Paw!',response);            
        }
        callback(null, response);
    })
}

module.exports = pawsPOST;