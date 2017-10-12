(function () {
    'use strict'

    var config = require('../config');

    module.exports.initConfig = function () {
        // Set database table prefix to deployment_stage name
        config.DB.setDefaults({ prefix: config.DEPLOYMENT_STAGE + "_" });

        // If Dynamo DB is set to run locally set dynamoose connections to local connections
        // found in config.js/DYNAMODB_CONFIG_LOCAL object.        
        if (process.env.DYNAMODB_ENV === 'local') {
            var DB_CONFIG = config.DYNAMODB_CONFIG_LOCAL
            config.DB.local(DB_CONFIG.url + ':' + DB_CONFIG.port)
            config.DB.AWS.config.update(DB_CONFIG.AWS)
        }
    }

    module.exports.getConfig = function () {
        return config;
    }
})()
