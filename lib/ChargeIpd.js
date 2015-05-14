
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE charge_ipd FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, AN, @DATETIME_ADMIT, WARDSTAY, CHARGEITEM, CHARGELIST, ' +
        'QUANTITY, INSTYPE, COST, PRICE, PAYPRICE, @D_UPDATE) SET ' +
        'D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATETIME_ADMIT=STR_TO_DATE(@DATETIME_ADMIT, "%Y%m%d%H%i%s")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};