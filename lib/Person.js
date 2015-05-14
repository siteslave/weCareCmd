
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();
    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE person ' +
            'FIELDS TERMINATED BY "|" LINES TERMINATED BY "\n" ' +
            'IGNORE 1 ROWS (HOSPCODE, CID, PID, HID, PRENAME, NAME, ' +
            'LNAME, HN, SEX, @BIRTH, MSTATUS, OCCUPATION_OLD, OCCUPATION_NEW, ' +
            'RACE, NATION, RELIGION, EDUCATION, FSTATUS, FATHER, MOTHER, ' +
            'COUPLE, VSTATUS, @MOVEIN, DISCHARGE, @DDISCHARGE, ABOGROUP, RHGROUP, ' +
            'LABOR, PASSPORT, TYPEAREA, @D_UPDATE) ' +
            'SET BIRTH=STR_TO_DATE(@BIRTH, "%Y%m%d"), ' +
            'MOVEIN=STR_TO_DATE(@MOVEIN, "%Y%m%d"), ' +
            'DDISCHARGE=STR_TO_DATE(@DDISCHARGE, "%Y%m%d"), ' +
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
