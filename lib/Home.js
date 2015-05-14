
var Q = require('q');

exports.import = function (db, file) {
    var q = Q.defer();

    var sql = 'LOAD DATA LOCAL INFILE ? REPLACE INTO TABLE home FIELDS ' +
        'TERMINATED BY "|" LINES TERMINATED BY "\n" IGNORE 1 ROWS ' +
        '(HOSPCODE, HID, HOUSE_ID, HOUSETYPE, ROOMNO, CONDO, HOUSE, ' +
        'SOISUB, SOIMAIN, ROAD, VILLANAME, VILLAGE, TAMBON, AMPUR, ' +
        'CHANGWAT, TELEPHONE, LATITUDE, LONGITUDE, NFAMILY, LOCATYPE, ' +
        'VHVID, HEADID, TOILET, WATER, WATERTYPE, GARBAGE, HOUSING, ' +
        'DURABILITY, CLEANLINESS, VENTILATION, LIGHT, WATERTM, MFOOD, ' +
        'BCONTROL, ACONTROL, CHEMICAL, @OUTDATE, @D_UPDATE) ' +
        'SET OUTDATE=STR_TO_DATE(@OUTDATE, "%Y%m%d"), ' +
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