
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE dental FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, SEQ, @DATE_SERV, DENTTYPE, SERVPLACE, PTEETH, ' +
        'PCARIES, PFILLING, PEXTRACT, DTEETH,  DCARIES, DFILLING, DEXTRACT, ' +
        'NEED_FLUORIDE, NEED_SCALING, NEED_SEALANT, NEED_PFILLING, NEED_DFILLING, ' +
        'NEED_PEXTRACT, NEED_DEXTRACT, NPROSTHESIS, PERMANENT_PERMANENT, ' +
        'PERMANENT_PROSTHESIS, PROSTHESIS_PROSTHESIS, GUM, SCHOOLTYPE, CLASS, ' +
        'PROVIDER, @D_UPDATE) SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATE_SERV=STR_TO_DATE(@DATE_SERV, "%Y%m%d")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};