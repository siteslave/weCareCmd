
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE surveillance FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, SEQ, @DATE_SERV, AN, @DATETIME_ADMIT, SYNDROME, ' +
        'DIAGCODE, CODE506, DIAGCODELAST, CODE506LAST, ILLDATE, ILLHOUSE, ' +
        'ILLVILLAGE, ILLTAMBON, ILLAMPUR, ILLCHANGWAT, LATITUDE, LONGITUDE, ' +
        'PTSTATUS, @DATE_DEATH, COMPLICATION, ORGANISM, PROVIDER, @D_UPDATE) ' +
        'SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATETIME_ADMIT=STR_TO_DATE(@DATETIME_ADMIT, "%Y%m%d%H%i%s"), ' +
        'DATE_SERV=STR_TO_DATE(@DATE_SERV, "%Y%m%d"), DATE_DEATH=STR_TO_DATE(@DATE_DEATH, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};