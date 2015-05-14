/**
 * Import files
 */

// Modules dependencies injection
var shell = require('shelljs'),
    fse = require('fs-extra'),
    Zip = require('adm-zip'),
    _ = require('lodash'),
    path = require('path'),
    Q = require('q');

var Person = require('./Person');
var Service = require('./Service');
var DiagnosisOpd = require('./DiagnosisOpd');
var DrugOpd = require('./DrugOpd');
var ProcedureOpd = require('./ProcedureOpd');
var Home = require('./Home');
var Address = require('./Address');
var ChargeOpd = require('./ChargeOpd');
var Admission = require('./Admission');
var DrugIpd = require('./DrugIpd');
var ProcedureIpd = require('./ProcedureIpd');
var ChargeIpd = require('./ChargeIpd');
var Anc = require('./Anc');
var Epi = require('./Epi');
var Fp = require('./Fp');
var Surveillance = require('./Surveillance');
var Accident = require('./Accident');
var DrugAllergy = require('./DrugAllergy');
var Dental = require('./Dental');
var Chronic = require('./Chronic');
var NcdScreen = require('./NcdScreen');
var ChronicFu = require('./ChronicFu');
var LabFu = require('./LabFu');
var Prenatal = require('./Prenatal');
var Labor = require('./Labor');
var Postnatal = require('./Postnatal');
var Newborn = require('./Newborn');
var NewbornCare = require('./NewbornCare');
var Nutrition = require('./Nutrition');
var CommunityService = require('./CommunityService');
var CommunityActivity = require('./CommunityActivity');
var Disability = require('./Disability');
var Functional = require('./Functional');
var Icf = require('./Icf');
var Rehabilitation = require('./Rehabilitation');
var Provider = require('./Provider');
var Village = require('./Village');
var Death = require('./Death');
var Appointment = require('./Appointment');

module.exports = {

    doImport: function (files, db) {
        var allFiles = [],
            q = Q.defer();
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
                if (allFiles.service) return Service.import(db, allFiles.service);
                return;
            })
            .then(function () {
                if (allFiles.diagnosisOpd) return DiagnosisOpd.import(db, allFiles.diagnosisOpd);
                return;
            })
            .then(function () {
                if (allFiles.drugOpd) return DrugOpd.import(db, allFiles.drugOpd);
                return;
            })
            .then(function () {
                if (allFiles.procedureOpd) return ProcedureOpd.import(db, allFiles.procedureOpd);
                return;
            })
            .then(function () {
                if (allFiles.home) return Home.import(db, allFiles.home);
                return;
            })
            .then(function () {
                if (allFiles.address) return Address.import(db, allFiles.address);
                return;
            })
            .then(function () {
                if (allFiles.ChargeOpd) return ChargeOpd.import(db, allFiles.chargeOpd);
                return;
            })
            .then(function () {
                if (allFiles.admission) return Admission.import(db, allFiles.admission);
                return;
            })
            .then(function () {
                if (allFiles.drugIpd) return DrugIpd.import(db, allFiles.drugIpd);
                return;
            })
            .then(function () {
                if (allFiles.chargeIpd) return ChargeIpd.import(db, allFiles.chargeIpd);
                return;
            })
            .then(function () {
                if (allFiles.procedureIpd) return ProcedureIpd.import(db, allFiles.procedureIpd);
                return;
            })
            .then(function () {
                if (allFiles.anc) return Anc.import(db, allFiles.anc);
                return;
            })
            .then(function () {
                if (allFiles.epi) return Epi.import(db, allFiles.epi);
                return;
            })
            .then(function () {
                if (allFiles.fp) return Fp.import(db, allFiles.fp);
                return;
            })
            .then(function () {
                if (allFiles.surveillance) return Surveillance.import(db, allFiles.surveillance);
                return;
            })
            .then(function () {
                if (allFiles.accident) return Accident.import(db, allFiles.accident);
                return;
            })
            .then(function () {
                if (allFiles.drugAllergy) return DrugAllergy.import(db, allFiles.drugAllergy);
                return;
            })
            .then(function () {
                if (allFiles.dental) return Dental.import(db, allFiles.dental);
                return;
            })
            .then(function () {
                if (allFiles.chronic) return Chronic.import(db, allFiles.chronic);
                return;
            })
            .then(function () {
                if (allFiles.ncdscreen) return NcdScreen.import(db, allFiles.ncdscreen);
                return;
            })
            .then(function () {
                if (allFiles.chronicfu) return ChronicFu.import(db, allFiles.chronicfu);
                return;
            })
            .then(function () {
                if (allFiles.labfu) return LabFu.import(db, allFiles.labfu);
                return;
            })
            .then(function () {
                if (allFiles.prenatal) return Prenatal.import(db, allFiles.prenatal);
                return;
            })
            .then(function () {
                if (allFiles.labor) return Labor.import(db, allFiles.labor);
                return;
            })
            .then(function () {
                if (allFiles.postnatal) return Postnatal.import(db, allFiles.postnatal);
                return;
            })
            .then(function () {
                if (allFiles.newborn) return Newborn.import(db, allFiles.newborn);
                return;
            })
            .then(function () {
                if (allFiles.newbornCare) return NewbornCare.import(db, allFiles.newbornCare);
                return;
            })
            .then(function () {
                if (allFiles.nutrition) return Nutrition.import(db, allFiles.nutrition);
                return;
            })
            .then(function () {
                if (allFiles.communityService) return CommunityService.import(db, allFiles.communityService);
                return;
            })
            .then(function () {
                if (allFiles.communityActivity) return CommunityActivity.import(db, allFiles.communityActivity);
                return;
            })
            .then(function () {
                if (allFiles.disability) return Disability.import(db, allFiles.disability);
                return;
            })
            .then(function () {
                if (allFiles.functional) return Functional.import(db, allFiles.functional);
                return;
            })
            .then(function () {
                if (allFiles.icf) return Icf.import(db, allFiles.icf);
                return;
            })
            .then(function () {
                if (allFiles.rehabilitation) return Rehabilitation.import(db, allFiles.rehabilitation);
                return;
            })
            .then(function () {
                if (allFiles.provider) return Provider.import(db, allFiles.provider);
                return;
            })
            .then(function () {
                if (allFiles.village) return Village.import(db, allFiles.village);
                return;
            })
            .then(function () {
                if (allFiles.death) return Death.import(db, allFiles.death);
                return;
            })
            .then(function () {
                if (allFiles.appointment) return Appointment.import(db, allFiles.appointment);
                return;
            })
            .then(function () {
                q.resolve();
            }, function (err) {
                q.reject(err);
            });


        return q.promise;
    }
};
