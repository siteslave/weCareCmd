
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE prenatal FIELDS TERMINATED ' +
        'BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS (HOSPCODE, PID, GRAVIDA, @LMP, ' +
        '@EDC, VDRL_RESULT, HB_RESULT, HIV_RESULT, @DATE_HCT, HCT_RESULT, THALASSEMIA, ' +
        '@D_UPDATE) SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'LMP=STR_TO_DATE(@LMP, "%Y%m%d"), EDC=STR_TO_DATE(@EDC, "%Y%m%d"), ' +
        'DATE_HCT=STR_TO_DATE(@DATE_HCT, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};