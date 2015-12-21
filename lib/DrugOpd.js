var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {
  var q = Q.defer();

  var col = db.collection('drug_opd');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ PID: 1 });
  col.createIndex({ SEQ: 1 });
  col.createIndex({ DIDSTD: 1 });

  var total = 0;

  _.forEach(data, function(v) {
    if (v.DATE_SERV && v.HOSPCODE && v.PID && v.SEQ && v.DIDSTD) {
      total++;
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');
      v.DATE_SERV = moment(v.DATE_SERV, "YYYYMMDD").format('x');

      query.find({
          HOSPCODE: v.HOSPCODE,
          PID: v.PID,
          SEQ: v.SEQ,
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
