/**
 * Import files
 */
// Modules dependencies injection
var _ = require('lodash'),
    path = require('path'),
    Q = require('q');

var Tools = require('./Tools');
var Person = require('./Person');
var Service = require('./Service');
var DiagnosisOpd = require('./DiagnosisOpd');
var DiagnosisIpd = require('./DiagnosisIpd');
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
var Card = require('./Card');
var CareRefer = require('./CareRefer');
var ClinicalRefer = require('./ClinicalRefer');
var DrugRefer = require('./DrugRefer');
var InvestigationRefer = require('./InvestigationRefer');
var ProcedureRefer = require('./ProcedureRefer');
var ReferHistory = require('./ReferHistory');
var ReferResult = require('./ReferResult');
var SpecialPP = require('./SpecialPP');
var Women = require('./Women');

module.exports = {

  doImport: function (files, url) {
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
        if (fileName == 'CARD.TXT') allFiles.card = file;
        if (fileName == 'CARE_REFER.TXT') allFiles.care_refer = file;
        if (fileName == 'CLINICAL_REFER.TXT') allFiles.clinical_refer = file;
        if (fileName == 'DRUG_REFER.TXT') allFiles.drug_refer = file;
        if (fileName == 'INVESTIGATION_REFER.TXT') allFiles.investigation_refer = file;
        if (fileName == 'PROCEDURE_REFER.TXT') allFiles.procedure_refer = file;
        if (fileName == 'REFER_HISTORY.TXT') allFiles.refer_history = file;
        if (fileName == 'REFER_RESULT.TXT') allFiles.refer_result = file;
        if (fileName == 'SPECIALPP.TXT') allFiles.specialpp = file;
        if (fileName == 'NCDSCREEN.TXT') allFiles.ncdscreen = file;
        if (fileName == 'WOMEN.TXT') allFiles.women = file;
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

    var MongoClient = require('mongodb').MongoClient;
    //var url = `mongodb://${config.user}:${config.password}@${config.host}:${parseInt(config.port)}/${config.database}`;

    MongoClient.connect(url, function(err, db) {
      if (err) q.reject(err);
      else {
        if (allFiles.person) {
          Tools.toJson(allFiles.person)
            .then(function(data) {
              return Person.import(db, data);
            })
            .then(function() {
              return allFiles.accident ? Tools.toJson(allFiles.accident) : null;
            })
            .then(function(data) {
              return _.size(data) ? Accident.import(db, data) : null;
            })
            .then(function() {
              return allFiles.address ? Tools.toJson(allFiles.address) : null;
            })
            .then(function(data) {
              return _.size(data) ? Address.import(db, data) : null;
            })
            .then(function() {
              return allFiles.admission ? Tools.toJson(allFiles.admission) : null;
            })
            .then(function(data) {
              return _.size(data) ? Admission.import(db, data) : null;
            })
            .then(function() {
              return allFiles.anc ? Tools.toJson(allFiles.anc) : null;
            })
            .then(function(data) {
              return _.size(data) ? Anc.import(db, data) : null;
            })
            .then(function() {
              return allFiles.appointment ? Tools.toJson(allFiles.appointment) : null;
            })
            .then(function(data) {
              return _.size(data) ? Appointment.import(db, data) : null;
            })
            .then(function() {
              return allFiles.card ? Tools.toJson(allFiles.card) : null;
            })
            .then(function(data) {
              return _.size(data) ? Card.import(db, data) : null;
            })
            .then(function() {
              return allFiles.care_refer ? Tools.toJson(allFiles.care_refer) : null;
            })
            .then(function(data) {
              return _.size(data) ? CareRefer.import(db, data) : null;
            })
            .then(function() {
              return allFiles.chargeIpd ? Tools.toJson(allFiles.chargeIpd) : null;
            })
            .then(function(data) {
              return _.size(data) ? ChargeIpd.import(db, data) : null;
            })
            .then(function() {
              return allFiles.chargeOpd ? Tools.toJson(allFiles.chargeOpd) : null;
            })
            .then(function(data) {
              return _.size(data) ? ChargeOpd.import(db, data) : null;
            })
            .then(function() {
              return allFiles.chronic ? Tools.toJson(allFiles.chronic) : [];
            })
            .then(function(data) {
              return _.size(data) ? Chronic.import(db, data) : null;
            })
            .then(function() {
              return allFiles.chronicfu ? Tools.toJson(allFiles.chronicfu) : null;
            })
            .then(function(data) {
              return _.size(data) ? ChronicFu.import(db, data) : null;
            })
            .then(function() {
              return allFiles.clinical_refer ? Tools.toJson(allFiles.clinical_refer) : [];
            })
            .then(function(data) {
              return _.size(data) ? ClinicalRefer.import(db, data) : null;
            })
            .then(function() {
              return allFiles.communityActivity ? Tools.toJson(allFiles.communityActivity) : null;
            })
            .then(function(data) {
              return _.size(data) ? CommunityActivity.import(db, data) : null;
            })
            .then(function() {
              return allFiles.communityService ? Tools.toJson(allFiles.communityService) : null;
            })
            .then(function(data) {
              return _.size(data) ? CommunityService.import(db, data) : null;
            })
            .then(function() {
              return allFiles.death ? Tools.toJson(allFiles.death) : null;
            })
            .then(function(data) {
              return _.size(data) ? Death.import(db, data) : null;
            })
            .then(function() {
              return allFiles.dental ? Tools.toJson(allFiles.dental) : null;
            })
            .then(function(data) {
              return _.size(data) ? Dental.import(db, data) : null;
            })
            .then(function() {
              return allFiles.diagnosisIpd ? Tools.toJson(allFiles.diagnosisIpd) : null;
            })
            .then(function(data) {
              return _.size(data) ? DiagnosisIpd.import(db, data) : null;
            })
            .then(function() {
              return allFiles.diagnosisOpd ? Tools.toJson(allFiles.diagnosisOpd) : null;
            })
            .then(function(data) {
              return _.size(data) ? DiagnosisOpd.import(db, data) : null;
            })
            .then(function() {
              return allFiles.disability ? Tools.toJson(allFiles.disability) : null;
            })
            .then(function(data) {
              return _.size(data) ? Disability.import(db, data) : null;
            })
            .then(function() {
              return allFiles.drugIpd ? Tools.toJson(allFiles.drugIpd) : null;
            })
            .then(function(data) {
              return _.size(data) ? DrugIpd.import(db, data) : null;
            })
            .then(function() {
              return allFiles.drugOpd ? Tools.toJson(allFiles.drugOpd) : null;
            })
            .then(function(data) {
              return _.size(data) ? DrugOpd.import(db, data) : null;
            })
            .then(function() {
              return allFiles.drug_refer ? Tools.toJson(allFiles.drug_refer) : null;
            })
            .then(function(data) {
              return _.size(data) ? DrugRefer.import(db, data) : null;
            })
            .then(function() {
              return allFiles.drugAllergy ? Tools.toJson(allFiles.drugAllergy) : null;
            })
            .then(function(data) {
              return _.size(data) ? DrugAllergy.import(db, data) : null;
            })
            .then(function() {
              return allFiles.epi ? Tools.toJson(allFiles.epi) : null;
            })
            .then(function(data) {
              return _.size(data) ? Epi.import(db, data) : null;
            })
            .then(function() {
              return allFiles.fp ? Tools.toJson(allFiles.fp) : null;
            })
            .then(function(data) {
              return _.size(data) ? Fp.import(db, data) : null;
            })
            .then(function() {
              return allFiles.functional ? Tools.toJson(allFiles.functional) : null;
            })
            .then(function(data) {
              return _.size(data) ? Functional.import(db, data) : null;
            })
            .then(function() {
              return allFiles.home ? Tools.toJson(allFiles.home) : null;
            })
            .then(function(data) {
              return _.size(data) ? Home.import(db, data) : null;
            })
            .then(function() {
              return allFiles.icf ? Tools.toJson(allFiles.icf) : null;
            })
            .then(function(data) {
              return _.size(data) ? Icf.import(db, data) : null;
            })
            .then(function() {
              return allFiles.investigation_refer ? Tools.toJson(allFiles.investigation_refer) : null;
            })
            .then(function(data) {
              return _.size(data) ? InvestigationRefer.import(db, data) : null;
            })
            .then(function() {
              return allFiles.labfu ? Tools.toJson(allFiles.labfu) : null;
            })
            .then(function(data) {
              return _.size(data) ? LabFu.import(db, data) : null;
            })
            .then(function() {
              return allFiles.labor ? Tools.toJson(allFiles.labor) : null;
            })
            .then(function(data) {
              return _.size(data) ? Labor.import(db, data) : null;
            })
            .then(function() {
              return allFiles.ncdscreen ? Tools.toJson(allFiles.ncdscreen) : null;
            })
            .then(function(data) {
              return _.size(data) ? NcdScreen.import(db, data) : null;
            })
            .then(function() {
              return allFiles.newborn ? Tools.toJson(allFiles.newborn) : null;
            })
            .then(function(data) {
              return _.size(data) ? Newborn.import(db, data) : null;
            })
            .then(function() {
              return allFiles.newbornCare ? Tools.toJson(allFiles.newbornCare) : null;
            })
            .then(function(data) {
              return _.size(data) ? NewbornCare.import(db, data) : null;
            })
            .then(function() {
              return allFiles.nutrition ? Tools.toJson(allFiles.nutrition) : null;
            })
            .then(function(data) {
              return _.size(data) ? Nutrition.import(db, data) : null;
            })
            .then(function() {
              return allFiles.postnatal ? Tools.toJson(allFiles.postnatal) : null;
            })
            .then(function(data) {
              return _.size(data) ? Postnatal.import(db, data) : null;
            })
            .then(function() {
              return allFiles.prenatal ? Tools.toJson(allFiles.prenatal) : null;
            })
            .then(function(data) {
              return _.size(data) ? Prenatal.import(db, data) : null;
            })
            .then(function() {
              return allFiles.procedureIpd ? Tools.toJson(allFiles.procedureIpd) : null;
            })
            .then(function(data) {
              return _.size(data) ? ProcedureIpd.import(db, data) : null;
            })
            .then(function() {
              return allFiles.procedureOpd ? Tools.toJson(allFiles.procedureOpd) : null;
            })
            .then(function(data) {
              return _.size(data) ? ProcedureOpd.import(db, data) : null;
            })
            .then(function() {
              return allFiles.procedure_refer ? Tools.toJson(allFiles.procedure_refer) : null;
            })
            .then(function(data) {
              return _.size(data) ? ProcedureRefer.import(db, data) : null;
            })
            .then(function() {
              return allFiles.provider ? Tools.toJson(allFiles.provider) : null;
            })
            .then(function(data) {
              return _.size(data) ? Provider.import(db, data) : null;
            })
            .then(function() {
              return allFiles.refer_history ? Tools.toJson(allFiles.refer_history) : null;
            })
            .then(function(data) {
              return _.size(data) ? ReferHistory.import(db, data) : null;
            })
            .then(function() {
              return allFiles.refer_result ? Tools.toJson(allFiles.refer_result) : null;
            })
            .then(function(data) {
              return _.size(data) ? ReferResult.import(db, data) : null;
            })
            .then(function() {
              return allFiles.rehabilitation ? Tools.toJson(allFiles.rehabilitation) : null;
            })
            .then(function(data) {
              return _.size(data) ? Rehabilitation.import(db, data) : null;
            })
            .then(function() {
              return allFiles.service ? Tools.toJson(allFiles.service) : null;
            })
            .then(function(data) {
              return _.size(data) ? Service.import(db, data) : null;
            })
            .then(function() {
              return allFiles.specialpp ? Tools.toJson(allFiles.specialpp) : null;
            })
            .then(function(data) {
              return _.size(data) ? SpecialPP.import(db, data) : null;
            })
            .then(function() {
              return allFiles.surveillance ? Tools.toJson(allFiles.surveillance) : null;
            })
            .then(function(data) {
              return _.size(data) ? Surveillance.import(db, data) : null;
            })
            .then(function() {
              return allFiles.village ? Tools.toJson(allFiles.village) : null;
            })
            .then(function(data) {
              return _.size(data) ? Village.import(db, data) : null;
            })
            .then(function() {
              return allFiles.women ? Tools.toJson(allFiles.women) : null;
            })
            .then(function(data) {
              return _.size(data) ? Women.import(db, data) : null;
            })
            .then(function() {
              db.close();
              q.resolve();
            }, function(err) {
              db.close();
              q.reject(err);
              console.log(err);

            });
        } else {
          q.reject('File PERSON.txt not found!');
        }
      }
    });

    return q.promise;
  }
};
