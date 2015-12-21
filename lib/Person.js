var Q = require('q');
var moment = require('moment');
var _ = require('lodash');

var Encrypt = require('./Encrypt');

exports.import = function(db, data) {

  var q = Q.defer();
  var col = db.collection('person');
  var query = col.initializeUnorderedBulkOp({
    useLegacyOps: true
  });

  col.createIndex({ HOSPCODE: 1 });
  col.createIndex({ PID: 1 });

  var total = 0;

  _.forEach(data, function(v) {
    if (v.BIRTH && v.HOSPCODE && v.PID && v.CID) {
      total++;

      v.BIRTH = moment(v.BIRTH, "YYYYMMDD").format('x');
      v.D_UPDATE = moment(v.D_UPDATE, "YYYYMMDDHHmmss").format('x');
      v.CID = Encrypt.createHash.encrypt(v.CID);
      v.NAME = Encrypt.createHash.encrypt(v.NAME);
      v.LNAME = Encrypt.createHash.encrypt(v.LNAME);

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
