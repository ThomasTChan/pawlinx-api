'use strict';

var dynamoose = require('dynamoose'),
    dynamooseSchema = dynamoose.Schema;

var ownerSchema = new dynamooseSchema({
    name: String,
    dob: Date,
    sex: String,
    picture: String,
    // Reference
    location: String,
    // Reference
    contact: String
});

var owner = dynamoose.model('owner',ownerSchema);

module.exports = {
    schema: ownerSchema,
    model: owner
}