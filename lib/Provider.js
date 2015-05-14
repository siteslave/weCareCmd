
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();
    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE provider FIELDS TERMINATED BY "|" LINES ' +
        'TERMINATED BY "\n" IGNORE 1 ROWS (HOSPCODE, PROVIDER, REGISTERNO, COUNCIL, CID, PRENAME, ' +
        'NAME, LNAME, SEX, @BIRTH, PROVIDERTYPE, @STARTDATE, @OUTDATE, MOVEFROM, MOVETO, @D_UPDATE) ' +
        'SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), BIRTH=STR_TO_DATE(@BIRTH, "%Y%m%d"), ' +
        'STARTDATE=STR_TO_DATE(@STARTDATE, "%Y%m%d"), OUTDATE=STR_TO_DATE(@OUTDATE, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};
