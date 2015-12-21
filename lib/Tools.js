const Q = require('q');
const fs = require('fs');
const parse = require('csv-parse');
var _ = require('lodash');

exports.toJson = (csvFile) => {
  var q = Q.defer();

  fs.readFile(csvFile, 'utf8', function(err, data) {
    if (err) {
      q.reject(err);
    } else {

      parse(data, {
        delimiter: '|',
        columns: true
      }, function(err, output) {
        if (err) {
          q.reject(err);
        } else {
          q.resolve(output);
        }
      });
    }
  });

  return q.promise;
}
