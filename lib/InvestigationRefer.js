var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {
  var q = Q.defer();

  var col = db.collection('investigation_refer');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ REFERID: 1 });
  col.createIndex({ DATETIME_INVEST: 1 });
  col.createIndex({ INVESTCODE: 1 });

  var total = 0;

  _.forEach(data, function(v) {
    if (v.DATETIME_INVEST && v.HOSPCODE && v.REFERID && v.INVESTCODE) {
      total++;
      v.DATETIME_INVEST = moment(v.DATETIME_INVEST, "YYYYMMDDHHmmss").format('x');
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');

      query.find({
          HOSPCODE: v.HOSPCODE,
          REFERID: v.REFERID,
          DATETIME_INVEST: v.DATETIME_INVEST,
          INVESTCODE: v.INVESTCODE
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
