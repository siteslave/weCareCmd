
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE drugallergy FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, @DATERECORD, DRUGALLERGY, DNAME, TYPEDX, ALEVEL, ' +
        'SYMPTOM, INFORMANT, INFORMHOSP, @D_UPDATE) SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATERECORD=STR_TO_DATE(@DATERECORD, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};