(function () {
    'use strict'

    var config = require('../config');

    module.exports.initConfig = function () {
        // Set database table prefix to deployment_stage name
        config.DB.setDefaults({ prefix: config.DEPLOYMENT_STAGE + "_" });
    }

    module.exports.getConfig = function(){
        return config;
    }
})()
