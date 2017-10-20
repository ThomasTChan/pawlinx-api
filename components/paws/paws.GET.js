'use strict';

var paw = require('./models/paws').model,
    AWS = require('aws-sdk');

var pawsGET = function (event, context, callback) {
    var response = {},
        dogId = event.queryStringParameters.dogId;

    paw.get({
        dogId: dogId
    },function(err,dogs){
        if(err){
            response = {
                statusCode: 500,
                body: {
                    message: 'Error Getting Paw with dogId: ' + dogId,
                    output: err
                }
            };            
        } else {
            response = {
                statusCode: 200,
                body: {
                    message: 'Success GET on dogId: ' + dogId,
                    output: dogs
                }
            };            
        }        
        callback(null, response);
    })
}

module.exports = pawsGET;