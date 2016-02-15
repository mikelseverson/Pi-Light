var _ = require('lodash');

var config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  dist: { 
  	defaultFile: "/index.html"
  },
  secrets: {
    jwt: process.env.JWT || 'secret'
  }
};

//Grabs active enviroment or defaults 'dev' and stores it onto the config file
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

//This needs improvements, 
//but I believe it's required incase there is a missing file for the active enviroment
//when merging, but it may not be required
var envConfig;
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

module.exports = _.merge(config, envConfig);