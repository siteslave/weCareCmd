var Zip = require('adm-zip'),
    Finder = require('fs-finder');

var iZip = {};

iZip.extractFile = function (src, dest) {
    var zip = new Zip(src);
    zip.extractAllTo(dest, true);
};

iZip.getFilesList = function (dest) {
    return Finder.from(dest).findFiles();
};

module.exports = iZip;
