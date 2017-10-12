'use strict'

module.exports.api = function (event, context, callback) {
    var response = {};
    var method = event.httpMethod;
    try {
        require('./owners.' + method)(event, context, callback);
    } catch (e) {
        console.log(e);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Method Not Implemented!',
                input: event.body
            })
        }
        callback(null, response);
    }
};


