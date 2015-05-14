var Q = require('q');

exports.import = function(db, file) {

    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE accident FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, PID, SEQ, @DATETIME_SERV, @DATETIME_AE, AETYPE, AEPLACE, ' +
        'TYPEIN_AE, TRAFFIC, VEHICLE, ALCOHOL, NACROTIC_DRUG, BELT, HELMET, ' +
        'AIRWAY, STOPBLEED, SPLINT, FLUID, URGENCY, COMA_EYE, COMA_SPEAK, ' +
        'COMA_MOVEMENT, @D_UPDATE) SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s"), ' +
        'DATETIME_SERV=STR_TO_DATE(@DATETIME_SERV, "%Y%m%d%H%i%s"), ' +
        'DATETIME_AE=STR_TO_DATE(@DATETIME_AE, "%Y%m%d%H%i%s")';

    db.raw(sql, [file])
        .then(function() {
            return q.resolve();
        })
        .catch(function(err) {
            return q.reject(err);
        });

    return q.promise;

};
