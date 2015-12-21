var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {
  var q = Q.defer();

  var col = db.collection('newborn_care');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ PID: 1 });
  col.createIndex({ BCARE: 1 });

  var total = 0;

  _.forEach(data, function(v) {
    if (v.BCARE && v.HOSPCODE && v.PID) {
      total++;
      v.BCARE = moment(v.BCARE, "YYYYMMDD").format('x');
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');

      query.find({
          HOSPCODE: v.HOSPCODE,
          PID: v.PID,
          BCARE: v.BCARE
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
