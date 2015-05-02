
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE drug_ipd FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, AN, @DATETIME_ADMIT, WARDSTAY, TYPEDRUG, DIDSTD, ' +
        'DNAME, @DATESTART, @DATEFINISH, AMOUNT, UNIT, UNIT_PACKING, DRUGPRICE, ' +
        'DRUGCOST, PROVIDER, @D_UPDATE) SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATETIME_ADMIT=STR_TO_DATE(@DATETIME_ADMIT, "%Y%m%d%H%i%s"), ' +
        'DATESTART=STR_TO_DATE(@DATESTART, "%Y%m%d"), ' +
        'DATEFINISH=STR_TO_DATE(@DATEFINISH, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};