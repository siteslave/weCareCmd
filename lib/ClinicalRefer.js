var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {
  var q = Q.defer();

  var col = db.collection('clinical_refer');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ REFERID: 1 });
  col.createIndex({ DATETIME_ASSESS: 1 });
  col.createIndex({ CLINICALCODE: 1 });

  var total = 0;

  _.forEach(data, function(v) {
    if (v.HOSPCODE && v.REFERID && v.DATETIME_ASSESS && v.CLINICALCODE) {
      total++;
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');
      v.DATETIME_ASSESS = moment(v.DATETIME_ASSESS, "YYYYMMDDHHmmss").format('x');

      query.find({
          HOSPCODE: v.HOSPCODE,
          REFERID: v.REFERID,
          DATETIME_ASSESS: v.DATETIME_ASSESS,
          CLINICALCODE: v.CLINICALCODE
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
