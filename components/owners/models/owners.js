'use strict';

var dynamoose = require('dynamoose'),
    dynamooseSchema = dynamoose.Schema;

var ownerSchema = new dynamooseSchema({
    accountId: {
        type: String,
        required: true,
        hashKey: true
    },
    beaconIds: {
        type: [String],
        required: true
    },
    ownerId: {        
        type: String,
        required: true,
        rangeKey: true
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
    occupation: String,
    // Reference
    location: Object,
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