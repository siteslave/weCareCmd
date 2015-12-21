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
Connection.testConnection = function(db) {
  db('person')
    .select()
    .limit(1)
    .then(function() {
      console.log('Success');
      console.log('Time: %s second(s)', process.uptime());
      //console.log('Memory usage: %s', JSON.stringify(process.memoryUsage()));
      process.exit(0);
    })
    .catch(function(err) {
      console.log(err.message);
      console.log('Time: %s second(s)', process.uptime());
      //console.log('Memory usage: %s', JSON.stringify(process.memoryUsage()));
      process.exit(1);
    });
};

/**
 * Export moduels
 */
module.exports = Connection;
