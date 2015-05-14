
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE service FIELDS TERMINATED BY "|" LINES ' +
        'TERMINATED BY "\n" IGNORE 1 ROWS (HOSPCODE, PID, HN, SEQ, @DATE_SERV, @TIME_SERV, LOCATION, ' +
        'INTIME, INSTYPE, INSID, MAIN, TYPEIN, REFERINHOSP, CAUSEIN, CHIEFCOMP, SERVPLACE, BTEMP, ' +
        'SBP, DBP, PR, RR, TYPEOUT, REFEROUTHOSP, CAUSEOUT, COST, PRICE, PAYPRICE, ACTUALPAY, ' +
        '@D_UPDATE) SET DATE_SERV=STR_TO_DATE(@DATE_SERV, "%Y%m%d"), ' +
        'TIME_SERV=STR_TO_DATE(@TIME_SERV, "%H%i%s"), ' +
        'D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};