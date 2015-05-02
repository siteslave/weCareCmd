
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE newborn FIELDS TERMINATED BY "|" LINES ' +
            'TERMINATED BY "\n" IGNORE 1 ROWS (HOSPCODE, PID, MPID, GRAVIDA, GA, @BDATE, ' +
            'BTIME, BPLACE, BHOSP, BIRTHNO, BTYPE, BDOCTOR, BWEIGHT, ASPHYXIA, VITK, TSH, ' +
            'TSHRESULT, @D_UPDATE) SET BDATE=STR_TO_DATE(@BDATE, "%Y%m%d"), ' +
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