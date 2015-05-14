#!/usr/bin/env node

/* Modules dependencies */
var moment = require('moment'),
    _ = require('lodash'),
    path = require('path'),
    fse = require('fs-extra'),
    fs = require('fs'),
    finder = require('fs-finder'),
    Random = require('random-js'),
    Q = require('q'),
    program = require('commander'),
    colors = require('cli-color'),

    // Dependencies for import file
    Connection = require('../lib/Connection'),
    Zip = require('../lib/Zip'),
    Import = require('../lib/Import');

require('q-foreach')(Q);

program
    .version('0.1.0')
    .usage('[option] ...')
    .option('-t, --test', 'Test MySQL Connection')
    .option('-i, --import', 'Start import files')
    .option('-f, --file <file | directory>', 'Import single file or multiple files')
    .option('-c, --config <file>', 'Set configure file')
    .option('-a, --all', 'Import all files in directory')
    .option('-l, --list', 'Get wating files list')
    .parse(process.argv);

if (program.config) {

    fs.access(program.config, fs.R_OK, function (err) {
        if (err) {
            console.log('Configuration file not found!');
            process.exit(1);
        } else {
            /* Read configuration file */
            var config = fse.readJsonSync(program.config);

            fse.ensureDirSync(config.extractedPath);
            fse.ensureDirSync(config.backupPath);
            fse.ensureDirSync(config.filesPath);

            var db = Connection.getConnection(config.db);

            if (program.file) {

                // Check file is directory or file
                var isDirectory = fs.lstatSync(program.file).isDirectory();

                if (isDirectory) {
                    // Get file list
                    var files = finder.in(program.file).findFiles();
                    var zipFiles = [];

                    _.forEach(files, function(v) {
                        if (path.extname(v).toUpperCase() == '.ZIP') {
                            zipFiles.push(v);
                        }
                    });

                    if (zipFiles.length) {

                        Q.forEach(zipFiles, function (v) {
                            var defer = Q.defer();

                            var rnd = new Random();
                            var rndPath = path.join(config.extractedPath, rnd.string(20));
                            // Create directory
                            fse.ensureDirSync(rndPath);
                            // Extract zip file
                            Zip.extractFile(v, rndPath);
                            // Get files list
                            var files = Zip.getFilesList(rndPath);

                            Import.doImport(files, db)
                                .then(function () {
                                    console.log(colors.blue('- ' + path.basename(v).toUpperCase()) + '...' + colors.green('OK'));
                                    defer.resolve();
                                }, function (err) {
                                    console.log(colors.blue('- ' + path.basename(v).toUpperCase()) + '...' + colors.red('FAILED'));
                                });

                            return defer.promise;

                        }).then(function () {

                            console.log(colors.green('Success.'));

                        });

                    } else {
                        console.log('File(s) not found!');
                    }

                } else {
                    console.log('Starting import file...' + colors.green(path.basename(program.file)));
                    // Create new extract path
                    var rnd = new Random();

                    var rndPath = path.join(config.extractedPath, rnd.string(20));
                    // Create directory
                    fse.ensureDirSync(rndPath);
                    // Extract zip file
                    Zip.extractFile(program.file, rndPath);
                    // Get files list
                    var files = Zip.getFilesList(rndPath);

                    Import.doImport(files, db)
                        .then(function () {
                            console.log(colors.blue('- ' + path.basename(path.basename(program.file)).toUpperCase()) + '...' + colors.green('OK'));
                            process.exit(0);
                        }, function (err) {
                            console.log(colors.blue('- ' + path.basename(path.basename(program.file)).toUpperCase()) + '...' + colors.red('FAILED'));
                        });

                }

            }

            if (program.test) {
                Connection.testConnection(db);
            }

            if (program.list) {
                console.log('Current files.');
                var files = finder.in(config.filesPath).findFiles();
                var i = 0;

                _.forEach(files, function(v) {
                    i++;
                    console.log('%d - %s', i, path.basename(v));
                });

                process.exit(0);

            }

        }
    });


} else {
    console.log('No configure file found!');
}
