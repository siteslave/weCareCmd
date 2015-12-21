var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {
  var q = Q.defer();

  var col = db.collection('drug_refer');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ REFERID: 1 });
  col.createIndex({ DATETIME_DSTART: 1 });
  col.createIndex({ DIDSTD: 1 });

  var total = 0;

  _.forEach(data, function(v) {
    if (v.HOSPCODE && v.REFERID && v.DATETIME_DSTART && v.DIDSTD) {
      total++;
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');
      v.DATETIME_DSTART = moment(v.DATETIME_DSTART, "YYYYMMDDHHmmss").format('x');

      query.find({
          HOSPCODE: v.HOSPCODE,
          REFERID: v.REFERID,
          DATETIME_DSTART: v.DATETIME_DSTART,
          DIDSTD: v.DIDSTD
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
