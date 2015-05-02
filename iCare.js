#!/usr/bin/env node

/* Modules dependencies */
var program = require('commander');
var moment = require('moment');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var fse = require('fs-extra');
var mv = require('mv');

// Dependencies for import file
var Connection = require('./app/Connection');
var Zip = require('./app/Zip');
var Person = require('./app/Person');
var Service = require('./app/Service');
var DiagnosisOpd = require('./app/DiagnosisOpd');
var DrugOpd = require('./app/DrugOpd');
var ProcedureOpd = require('./app/ProcedureOpd');
var Home = require('./app/Home');
var Address = require('./app/Address');
var ChargeOpd = require('./app/ChargeOpd');
var Admission = require('./app/Admission');
var DrugIpd = require('./app/DrugIpd');
var ProcedureIpd = require('./app/ProcedureIpd');
var ChargeIpd = require('./app/ChargeIpd');
var Anc = require('./app/Anc');
var Epi = require('./app/Epi');
var Fp = require('./app/Fp');
var Surveillance = require('./app/Surveillance');
var Accident = require('./app/Accident');
var DrugAllergy = require('./app/DrugAllergy');
var Dental = require('./app/Dental');
var Chronic = require('./app/Chronic');
var NcdScreen = require('./app/NcdScreen');
var ChronicFu = require('./app/ChronicFu');
var LabFu = require('./app/LabFu');
var Prenatal = require('./app/Prenatal');
var Labor = require('./app/Labor');
var Postnatal = require('./app/Postnatal');
var Newborn = require('./app/Newborn');
var NewbornCare = require('./app/NewbornCare');
var Nutrition = require('./app/Nutrition');
var CommunityService = require('./app/CommunityService');
var CommunityActivity = require('./app/CommunityActivity');
var Disability = require('./app/Disability');
var Functional = require('./app/Functional');
var Icf = require('./app/Icf');
var Rehabilitation = require('./app/Rehabilitation');
var Provider = require('./app/Provider');
var Village = require('./app/Village');
var Death = require('./app/Death');
var Appointment = require('./app/Appointment');


/* Read configuration file */
var config = fse.readJsonSync('./config.json');

fse.ensureDirSync(config.extractedPath);
fse.ensureDirSync(config.backupPath);
fse.ensureDirSync(config.filesPath);

var db = Connection.getConnection(config.db);

program
    .version('0.1.0')
    .usage('[option] ...')
    .option('-t, --test', 'Test MySQL Connection')
    .option('-i, --import', 'Start import files')
    .option('-f, --file <file>', 'Import single file')
    .option('-c, --config', 'Show connection')
    .option('-a, --all', 'Import all files in directory')
    .option('-l, --list', 'Get wating files list')
    .parse(process.argv);

if (program.file) {
    console.log('Starting import file... %s', path.basename(program.file));
    // Create new extract path
    var rndPath = path.join(config.extractedPath, moment().format('YYYYMMDDHHmmss'));
    // Create directory
    fse.ensureDirSync(rndPath);
    // Extract zip file
    Zip.extractFile(program.file, rndPath);
    // Get files list
    var files = Zip.getFilesList(rndPath);
    // Create file array
    var allFiles = [];
    // Get full file path
    _.forEach(files, function (file) {
        var fileName = path.basename(file).toUpperCase();
        if (fileName == 'PERSON.TXT') allFiles.person = file;
        if (fileName == 'SERVICE.TXT') allFiles.service = file;
        if (fileName == 'DRUG_OPD.TXT') allFiles.drugOpd = file;
        if (fileName == 'DIAGNOSIS_OPD.TXT') allFiles.diagnosisOpd = file;
        if (fileName == 'PROCEDURE_OPD.TXT') allFiles.procedureOpd = file;
        if (fileName == 'HOME.TXT') allFiles.home = file;
        if (fileName == 'ADDRESS.TXT') allFiles.address = file;
        if (fileName == 'CHARGE_OPD.TXT') allFiles.chargeOpd = file;
        if (fileName == 'ADMISSION.TXT') allFiles.admission = file;
        if (fileName == 'DIAGNOSIS_IPD.TXT') allFiles.diagnosisIpd = file;
        if (fileName == 'DRUG_IPD.TXT') allFiles.drugIpd = file;
        if (fileName == 'PROCEDURE_IPD.TXT') allFiles.procedureIpd = file;
        if (fileName == 'CHARGE_IPD.TXT') allFiles.chargeIpd = file;
        if (fileName == 'ANC.TXT') allFiles.anc = file;
        if (fileName == 'EPI.TXT') allFiles.epi = file;
        if (fileName == 'FP.TXT') allFiles.fp = file;
        if (fileName == 'SURVEILLANCE.TXT') allFiles.surveillance = file;
        if (fileName == 'ACCIDENT.TXT') allFiles.accident = file;
        if (fileName == 'DRUGALLERGY.TXT') allFiles.drugAllergy = file;
        if (fileName == 'DENTAL.TXT') allFiles.dental = file;
        if (fileName == 'CHRONIC.TXT') allFiles.chronic = file;
        if (fileName == 'NCDSCREEN.TXT') allFiles.ncdscreen = file;
        if (fileName == 'CHRONICFU.TXT') allFiles.chronicfu = file;
        if (fileName == 'LABFU.TXT') allFiles.labfu = file;
        if (fileName == 'PRENATAL.TXT') allFiles.prenatal = file;
        if (fileName == 'LABOR.TXT') allFiles.labor = file;
        if (fileName == 'POSTNATAL.TXT') allFiles.postnatal = file;
        if (fileName == 'NEWBORN.TXT') allFiles.newborn = file;
        if (fileName == 'NEWBORNCARE.TXT') allFiles.newbornCare = file;
        if (fileName == 'NUTRITION.TXT') allFiles.nutrition = file;
        if (fileName == 'COMMUNITY_SERVICE.TXT') allFiles.communityService = file;
        if (fileName == 'COMMUNITY_ACTIVITY.TXT') allFiles.communityActivity = file;
        if (fileName == 'DISABILITY.TXT') allFiles.disability = file;
        if (fileName == 'FUNCTIONAL.TXT') allFiles.functional = file;
        if (fileName == 'ICF.TXT') allFiles.icf = file;
        if (fileName == 'REHABILITATION.TXT') allFiles.rehabilitation = file;
        if (fileName == 'PROVIDER.TXT') allFiles.provider = file;
        if (fileName == 'VILLAGE.TXT') allFiles.village = file;
        if (fileName == 'DEATH.TXT') allFiles.death = file;
        if (fileName == 'APPOINTMENT.TXT') allFiles.appointment = file;
    });

    Person.import(db, allFiles.person)
        .then(function () {
            return Service.import(db, allFiles.service);
        })
        .then(function () {
            return DiagnosisOpd.import(db, allFiles.diagnosisOpd);
        })
        .then(function () {
            return DrugOpd.import(db, allFiles.drugOpd);
        })
        .then(function () {
            return ProcedureOpd.import(db, allFiles.procedureOpd);
        })
        .then(function () {
            return Home.import(db, allFiles.home);
        })
        .then(function () {
            return Address.import(db, allFiles.address);
        })
        .then(function () {
            return ChargeOpd.import(db, allFiles.chargeOpd);
        })
        .then(function () {
            return Admission.import(db, allFiles.admission);
        })
        .then(function () {
            return DrugIpd.import(db, allFiles.drugIpd);
        })
        .then(function () {
            return ChargeIpd.import(db, allFiles.chargeIpd);
        })
        .then(function () {
            return ProcedureIpd.import(db, allFiles.procedureIpd);
        })
        .then(function () {
            return Anc.import(db, allFiles.anc);
        })
        .then(function () {
            return Epi.import(db, allFiles.epi);
        })
        .then(function () {
            return Fp.import(db, allFiles.fp);
        })
        .then(function () {
            return Surveillance.import(db, allFiles.surveillance);
        })
        .then(function () {
            return Accident.import(db, allFiles.accident);
        })
        .then(function () {
            return DrugAllergy.import(db, allFiles.drugAllergy);
        })
        .then(function () {
            return Dental.import(db, allFiles.dental);
        })
        .then(function () {
            return Chronic.import(db, allFiles.chronic);
        })
        .then(function () {
            return NcdScreen.import(db, allFiles.ncdscreen);
        })
        .then(function () {
            return ChronicFu.import(db, allFiles.chronicfu);
        })
        .then(function () {
            return LabFu.import(db, allFiles.labfu);
        })
        .then(function () {
            return Prenatal.import(db, allFiles.prenatal);
        })
        .then(function () {
            return Labor.import(db, allFiles.labor);
        })
        .then(function () {
            return Postnatal.import(db, allFiles.postnatal);
        })
        .then(function () {
            return Newborn.import(db, allFiles.newborn);
        })
        .then(function () {
            return NewbornCare.import(db, allFiles.newbornCare);
        })
        .then(function () {
            return Nutrition.import(db, allFiles.nutrition);
        })
        .then(function () {
            return CommunityService.import(db, allFiles.communityService);
        })
        .then(function () {
            return CommunityActivity.import(db, allFiles.communityActivity);
        })
        .then(function () {
            return Disability.import(db, allFiles.disability);
        })
        .then(function () {
            return Functional.import(db, allFiles.functional);
        })
        .then(function () {
            return Icf.import(db, allFiles.icf);
        })
        .then(function () {
            return Rehabilitation.import(db, allFiles.rehabilitation);
        })
        .then(function () {
            return Provider.import(db, allFiles.provider);
        })
        .then(function () {
            return Village.import(db, allFiles.village);
        })
        .then(function () {
            return Death.import(db, allFiles.death);
        })
        .then(function () {
            return Death.import(db, allFiles.appointment);
        })
        .then(function () {
            return Appointment.import(db, allFiles.appointment);
        })
        .then(function () {
            // success
            console.log('Import success.');
            // Remove old directory
            if(config.removeExtracted) {
                fse.deleteSync(rndPath);
            }

            if (config.isBackup) {
                // Backup file
                var destFile = path.join(config.backupPath, path.basename(program.file));
                // Move file
                mv(program.file, destFile, function (err) {
                    if (err) console.log(err);
                });
            }

            // Exit with success
            process.exit(0);
        }, function (err) {
            console.log(err);
        });
}

if (program.test) {
    Connection.testConnection(db);
}

if (program.list) {
    console.log('Current files.');
    var files = finder.in(config.filesPath).findFiles();
    var i = 0;
    _.forEach(files, function (v) {
        i++;
        console.log('%d - %s', i, path.basename(v));
    });

    process.exit(0);

}

if (program.config) {

    console.log('Your current connection: ');
    console.log('--------------------------');
    console.log('Host: %s', config.db.connection.host);
    console.log('User: %s', config.db.connection.user);
    console.log('Password: %s', config.db.connection.password);
    console.log('Database: %s', config.db.connection.database);
    console.log('Extracted path: %s', config.extractedPath);
    console.log('Files path: %s', config.filesPath);
    console.log('Backup path: %s', config.backupPath);
    console.log('--------------------------');

    process.exit(0);
}
