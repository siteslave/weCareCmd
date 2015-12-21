var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {
  var q = Q.defer();
  var col = db.collection('service');

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ PID: 1 });
  col.createIndex({ SEQ: 1 });

  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });
  var total = 0;
  _.forEach(data, function(v) {
    if (v.HOSPCODE && v.PID && v.SEQ && v.DATE_SERV) {
      total++;
      v.DATE_SERV = moment(v.DATE_SERV, "YYYYMMDD").format('x');
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');
      v.PRICE = parseFloat(v.PRICE);
      v.COST = parseFloat(v.COST);
      v.PAYPRICE = parseFloat(v.PAYPRICE);
      v.ACTUALPAY = parseFloat(v.ACTUALPAY);

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
