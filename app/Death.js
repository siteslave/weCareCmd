
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE death FIELDS TERMINATED BY "|" LINES ' +
        'TERMINATED BY "\n" IGNORE 1 ROWS (HOSPCODE, PID, HOSPDEATH, AN, SEQ, @DDEATH, ' +
        'CDEATH_A, CDEATH_B, CDEATH_C, CDEATH_D, ODISEASE, CDEATH, PREGDEATH, PDEATH, ' +
        'PROVIDER, @D_UPDATE) SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DDEATH=STR_TO_DATE(@DDEATH, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};