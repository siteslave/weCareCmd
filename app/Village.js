
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();
    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE village FIELDS TERMINATED BY "|" LINES ' +
        'TERMINATED BY "\n" IGNORE 1 ROWS (HOSPCODE, VID, NTRADITIONAL, NMONK, NRELIGIONLEADER, ' +
        'NBROADCAST, NRADIO, NPCHC, NCLINIC, NDRUGSTORE, NCHILDCENTER, NPSCHOOL, NSSCHOOL, NTEMPLE, ' +
        'NRELIGIOUSPLACE, NMARKET, NSHOP, NFOODSHOP, NSTALL, NRAINTANK, NCHICKENFARM, NPIGFARM, ' +
        'WASTEWATER, GARBAGE, NFACTORY, LATITUDE, LONGITUDE, OUTDATE, NUMACTUALLY, RISKTYPE, ' +
        'NUMSTATELESS, NEXERCISECLUB, NOLDERLYCLUB, NDISABLECLUB, NNUMBERONECLUB, @D_UPDATE) ' +
        'SET D_UPDATE=STR_TO_DATE(@D_UPDATE, "%Y%m%d%H%i%s")';

    db.raw(sql, [file])
        .then(function () {
            return q.resolve();
        })
        .catch(function (err) {
            return q.reject(err);
        });

    return q.promise;
};
