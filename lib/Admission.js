
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE admission FIELDS ' +
            'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
            '(HOSPCODE, PID, SEQ, AN, @DATETIME_ADMIT, WARDADMIT, INSTYPE, ' +
            'TYPEIN, REFERINHOSP, CAUSEIN, ADMITWEIGHT, ADMITHEIGHT, ' +
            '@DATETIME_DISCH, WARDDISCH, DISCHSTATUS, DISCHTYPE, REFEROUTHOSP, ' +
            'CAUSEOUT, COST, PRICE, PAYPRICE, ACTUALPAY, PROVIDER, @D_UPDATE) ' +
            'SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
            'DATETIME_ADMIT=STR_TO_DATE(@DATETIME_ADMIT, "%Y%m%d%H%i%s"), ' +
            'DATETIME_DISCH=STR_TO_DATE(@DATETIME_DISCH, "%Y%m%d%H%i%s");';

        db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};