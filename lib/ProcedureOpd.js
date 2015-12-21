var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {
  var q = Q.defer();
  var col = db.collection('procedure_opd');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ PID: 1 });
  col.createIndex({ SEQ: 1 });
  col.createIndex({ PROCEDCODE: 1 });

  var total = 0;

  _.forEach(data, function(v) {
    if (v.DATE_SERV && v.HOSPCODE && v.SEQ && v.PID && v.PROCEDCODE) {
      total++;
      v.DATE_SERV = moment(v.DATE_SERV, "YYYYMMDD").format('x');
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');

      query.find({
          HOSPCODE: v.HOSPCODE,
          PID: v.PID,
          SEQ: v.SEQ,
          PROCEDCODE: v.PROCEDCODE
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
