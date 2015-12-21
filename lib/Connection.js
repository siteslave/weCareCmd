/**
 * Connection module
 */

// Namespace
var Connection = {};

/**
 * Get connection
 *
 * @param config
 * @returns {*}
 */
Connection.getUrl = function(config) {
  var url = `mongodb://${config.user}:${config.password}@${config.host}:${parseInt(config.port)}/${config.database}`;
  return url;
};

/**
 * Test connection
 *
 * @param db
 */
Connection.testConnection = function(url) {
  var MongoClient = require('mongodb').MongoClient;
  //var url = `mongodb://${config.user}:${config.password}@${config.host}:${parseInt(config.port)}/${config.database}`;
  var colors = require('cli-color');

  MongoClient.connect(url, function(err) {
    if (!err) {
      console.log(colors.green('Success, connection established.'));
      process.exit(1);
    } else {
      console.log(colors.red('ERROR!'));
      console.log(colors.red(err.message));
      process.exit(1);
      //console.log('Memory usage: %s', JSON.stringify(process.memoryUsage()));
    }
  });
};

/**
 * Export moduels
 */
module.exports = Connection;
