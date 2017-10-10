'use strict';

var dynamoose = require('dynamoose'),
    dynamooseSchema = dynamoose.Schema;

var ownerSchema = new dynamooseSchema({
    ownerId: {
        type: Number,
        hashKey: true
    },
    name: {
        type: String,
        trim: true,
        index: {
            global: true,
            project: true,
        }
    },
    dob: Date,
    sex: String,
    picture: String,
    // Reference
    location: String,
    // Reference
    contact: {
        tel: String,
        email: String
    }
});

var owner = dynamoose.model('owner', ownerSchema);

module.exports = {
    schema: ownerSchema,
    model: owner
}