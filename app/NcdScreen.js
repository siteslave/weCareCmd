
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE ncdscreen FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, SEQ, @DATE_SERV, SERVPLACE, SMOKE, ALCOHOL, DMFAMILY, ' +
        'HTFAMILY, WEIGHT, HEIGHT, WAIST_CM, SBP_1, DBP_1, SBP_2, DBP_2, BSLEVEL, ' +
        'BSTEST, SCREENPLACE, PROVIDER, @D_UPDATE) SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATE_SERV=STR_TO_DATE(@DATE_SERV, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};