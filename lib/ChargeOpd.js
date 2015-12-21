var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

exports.import = function(db, data) {
  var q = Q.defer();
  var col = db.collection('charge_opd');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ PID: 1 });
  col.createIndex({ SEQ: 1 });
  col.createIndex({ CHARGEITEM: 1 });
  col.createIndex({ CHARGELIST: 1 });
  col.createIndex({ INSTYPE: 1 });

  var total = 0;

  _.forEach(data, function(v) {
    if (v.HOSPCODE && v.PID && v.SEQ && v.CHARGEITEM && v.CHARGELIST && v.INSTYPE) {
      total++;
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');
      v.DATE_SERV = moment(v.DATE_SERV, "YYYYMMDD").format('x');
      v.PRICE = parseFloat(v.PRICE);
      v.COST = parseFloat(v.COST);
      v.QUANTITY = parseInt(v.QUANTITY);
      v.PAYPRICE = parseFloat(v.PAYPRICE);

      query.find({
          HOSPCODE: v.HOSPCODE,
          PID: v.PID,
          SEQ: v.SEQ,
          CHARGEITEM: v.CHARGEITEM,
          CHARGELIST: v.CHARGELIST,
          INSTYPE: v.INSTYPE
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
