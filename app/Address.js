
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE address FIELDS ' +
            'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
            '(HOSPCODE, PID, ADDRESSTYPE, HOUSE_ID, HOUSETYPE, ROOMNO, ' +
            'CONDO, HOUSENO, SOISUB, SOIMAIN, ROAD, VILLANAME, VILLAGE, ' +
            'TAMBON, AMPUR, CHANGWAT, TELEPHONE, MOBILE, @D_UPDATE) ' +
            'SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s");';

        db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};