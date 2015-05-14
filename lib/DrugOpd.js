
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE drug_opd FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, SEQ, @DATE_SERV, CLINIC, DIDSTD, DNAME, AMOUNT, ' +
        'UNIT, UNIT_PACKING, DRUGPRICE, DRUGCOST, PROVIDER, @D_UPDATE) ' +
        'SET DATE_SERV=STR_TO_DATE(@DATE_SERV, "%Y%m%d"), ' +
        'D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s");';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};