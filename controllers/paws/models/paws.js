'use strict';


var config = require('../../../config').Init.getConfig();
var dynamooseSchema = config.DB.Schema;
var db = config.DB;

var pawSchema = new dynamooseSchema({
    dogId: {
        type: Number,
        validate: function (v) { return v > 0; },
        hashKey: true
    },
    name: {
        type: String,
        rangeKey: true,
        index: true // name: nameLocalIndex, ProjectionType: ALL
    },
    type: {
        type: String,
        trim: true,
        required: true,
        index: {
            global: true,
            rangeKey: 'dogId',
            name: 'TypeIndex',
            project: true, // ProjectionType: ALL
            throughput: 5 // read and write are both 5
        }
    },
    picture: {
        type: String
    },
    owner: {
        type: String
    },
    weight: {
        type: Number
    },
    dob: {
        type: Date
    },
    colour: {
        lowercase: true,
        type: [String],
        default: ['Brown']
    },
    sex: {
        type: String
    },
    favouriteFood: {
        type: String
    },
    hobbies: {
        type: [String]
    },
    tag: {
        type: [String]
    },
    temperature: {
        type: Number
    }
});

var paw = db.model('paw', pawSchema);

module.exports = {
    schema: pawSchema,
    model: paw
}


