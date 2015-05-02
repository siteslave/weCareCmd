
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE procedure_ipd ' +
        'FIELDS TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, AN, @DATETIME_ADMIT, WARDSTAY, PROCEDCODE, @TIMESTART, ' +
        '@TIMEFINISH, SERVICEPRICE, PROVIDER, @D_UPDATE) SET ' +
        'D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATETIME_ADMIT=STR_TO_DATE(@DATETIME_ADMIT, "%Y%m%d%H%i%s"), ' +
        'TIMESTART=STR_TO_DATE(@TIMESTART, "%H%i%s"), ' +
        'TIMEFINISH=STR_TO_DATE(@TIMEFINISH, "%H%i%s")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};