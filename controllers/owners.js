'use strict';

var dynamoose = require('dynamoose'),
    owner = require('../models/owners').model;

var owners = function (event, context, callback) {
    var response = {};
    var request = new owner(JSON.parse(event.body));
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
                    message: 'Saved Owner!',
                    input: event.body,
                }),
            };
        }
        callback(null, response);
    })    
};

module.exports = {
    owners: owners
}