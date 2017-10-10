'use strict';

var dynamoose = require('dynamoose'),
    owner = require('../../models/owners').model;

var ownersPOST = function (event, context, callback) {
    var response = {};
    console.log('hello!1')
    var request = new owner(JSON.parse(event.body));
    console.log(event.body);
    console.log('hello!2')
    request.save(function (err) {
        console.log('hello!3')
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

module.exports = ownersPOST;