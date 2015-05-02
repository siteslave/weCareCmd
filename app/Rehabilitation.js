
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE rehabilitation FIELDS TERMINATED ' +
        'BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS (HOSPCODE, PID, SEQ, AN, @DATE_ADMIT, ' +
        '@DATE_SERV, @DATE_START, @DATE_FINISH, REHABCODE, AT_DEVICE, AT_NO, REHABPLACE, ' +
        'PROVIDER, @D_UPDATE) SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATE_SERV=STR_TO_DATE(@DATE_SERV, "%Y%m%d"), ' +
        'DATE_ADMIT=STR_TO_DATE(@DATE_ADMIT, "%Y%m%d"), ' +
        'DATE_START=STR_TO_DATE(@DATE_START, "%Y%m%d"), ' +
        'DATE_FINISH=STR_TO_DATE(@DATE_FINISH, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};