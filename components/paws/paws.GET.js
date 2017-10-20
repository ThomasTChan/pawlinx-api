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
                body: JSON.stringify({
                    message: 'Error Getting Paw with dogId: ' + dogId,
                    output: err
                })
            };
            console.log('Error!',response)               
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Success GET on dogId: ' + dogId,
                    output: dogs
                })
            };         
            console.log('Success!',response)   
        }        
        callback(null, response);
    })
}

module.exports = pawsGET;