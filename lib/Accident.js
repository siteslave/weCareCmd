var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {

  var q = Q.defer();

  var col = db.collection('accident');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({
    HOSPCODE: 1
  });
  col.createIndex({
    PID: 1
  });
  col.createIndex({
    SEQ: 1
  });

  var total = 0;
  _.forEach(data, function(v) {
    if (v.HOSPCODE && v.PID && v.SEQ && v.DATETIME_SERV && v.DATETIME_AE && v.AETYPE) {
      total++;
      v.DATETIME_SERV = moment(v.DATETIME_SERV, "YYYYMMDDHHmmss").format('x');
      v.DATETIME_AE = moment(v.DATETIME_AE, "YYYYMMDDHHmmss").format('x');
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');

      query.find({
          HOSPCODE: v.HOSPCODE,
          PID: v.PID,
          SEQ: v.SEQ
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
