'use strict';

var paw = require('./models/paws').model,
    AWS = require('aws-sdk');

var pawsGET = function (event, context, callback) {
    var response = {},
        pawId = event.pathParameters.id;

    paw.get({
        pawId: pawId
    },function(err,paws){
        if(err){
            response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Error Getting Paw with pawId: ' + pawId,
                    output: err
                })
            };
            console.log('Error!',response)               
        } else {
            response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Success GET on pawId: ' + pawId,
                    output: paws
                })
            };         
            console.log('Success!',response)   
        }        
        callback(null, response);
    })
}

module.exports = pawsGET;