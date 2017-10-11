(function () {
    'use strict'

    var config = require('../config');

    module.exports.initConfig = function () {
        // Set database table prefix to deployment_stage name
        config.DB.setDefaults({ prefix: config.DEPLOYMENT_STAGE + "_" });
        if (config.DYNAMODB_ENV === 'local'){
            config.DB.local('http://localhost:8000')
            config.DB.AWS.config.update({
                region: 'localhost'
            })            
        }
    }

    module.exports.getConfig = function(){
        return config;
    }
})()
