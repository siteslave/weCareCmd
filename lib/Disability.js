
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE disability FIELDS TERMINATED ' +
        'BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS (HOSPCODE, DISABID, PID, DISABTYPE, ' +
        'DISABCAUSE, DIAGCODE, @DATE_DETECT, @DATE_DISAB, @D_UPDATE) SET ' +
        'D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATE_DETECT=STR_TO_DATE(@DATE_DETECT, "%Y%m%d"), ' +
        'DATE_DISAB=STR_TO_DATE(@DATE_DISAB, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};