'use strict';

var paw = require('./models/paws').model;

var pawsPOST = function (event, context, callback) {
    var response = {};
    var request = new paw(JSON.parse(event.body));
    request.save(function (err) {
        if (err) {
            console.log('Save Error: ', err);
            response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: err,
                    input: event.body
                })
            }
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Saved Paw!',
                    input: event.body,
                }),
            };
        }
        callback(null, response);
    })
}

module.exports = pawsPOST;