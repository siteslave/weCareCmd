var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {
  var q = Q.defer();

  var col = db.collection('death');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ PID: 1 });

  var total = 0;

  _.forEach(data, function(v) {
    if (v.DDEATH && v.HOSPCODE && v.PID) {
      total++;
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');
      v.DDEATH = moment(v.DDEATH, "YYYYMMDD").format('x');

      query.find({
          HOSPCODE: v.HOSPCODE,
          PID: v.PID
        })
        .upsert().updateOne(v);
    }
  });

  if (total) {
    query.execute(function(err, res) {
      if (err) {
        q.reject(err);
      } else {
        q.resolve();
      }
    });
  } else {
    q.resolve();
  }

  return q.promise;
};
