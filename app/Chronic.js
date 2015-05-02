
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE chronic FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, @DATE_DIAG, CHRONIC, HOSP_DX, HOSP_RX, ' +
        '@DATE_DISCH, TYPEDISCH, @D_UPDATE) SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATE_DIAG=STR_TO_DATE(@DATE_DIAG, "%Y%m%d"), DATE_DISCH=STR_TO_DATE(@DATE_DISCH, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};