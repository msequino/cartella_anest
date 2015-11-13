
var models = require("../models"),
  sequelize = require("sequelize");

module.exports.getPatients = function(req,res,next){
  var clinic = !req.user.getDataValue('ClinicId') ? {} : {ClinicId : req.user.getDataValue('ClinicId')};
  /*
    models.Summary.findAll({where : clinic,
          include : [{
            model : models.Patient
          }],
          limit : 10,
          offset : 10,
      }).then(function(data){
    res.json(data);
  });
  */
  var whereClinicId = req.user.getDataValue('clinicId') ? "WHERE p.ClinicId = :clinicId" : "";
  var paramsClinicId = req.user.getDataValue('clinicId') ? {clinicId : req.user.getDataValue('clinicId')} : {};
  models.sequelize.query("SELECT p.id,s.c1s1,s.c1s3,s.c1s2,CONCAT(d.surname, ' ',d.name) AS doctor,ag.id AS agid,an.id AS anid "+
    "FROM Patients p LEFT JOIN Summaries s ON p.id=s.PatientId "+
    " LEFT JOIN Analgesia ag ON s.id=ag.SummaryId "+
    " LEFT JOIN Anestesia an ON s.id=ag.SummaryId "+
    " LEFT JOIN Doctors d ON s.DoctorId=d.id "+
    "" + whereClinicId + " ORDER BY p.id", {replacements : paramsClinicId,
          type:models.sequelize.QueryTypes.SELECT}).then(function(data){
            res.json(data);

  });
}

module.exports.getPatient = function(req,res,next){
  models.Patient.findOne({where : {id:req.params.id}}).then(function(p){
    res.json(p);
  });
}

module.exports.insertPatient = function(req,res,next){
  models.Patient.create(req.body).then(function(p){
    res.json(p);
  }).catch(function(error){
    res.json(error);
  });
}

module.exports.updatePatient = function(req,res,next){
  models.Patient.findOne({where : {id : req.params.id}}).then(function(doctor){
    if(p)
      doctor.updateAttributes(req.body).then(function(p){
        res.json(p);
      });
  }).catch(function(error){
    res.json(error);
  });
}

module.exports.getInfo = function(req,res,next){
  var response = {};

  //GET Summary enums
  response['Summary.c1s2'] = models.Summary.rawAttributes.c1s2.values;
  response['Summary.c2s2'] = models.Summary.rawAttributes.c2s2.values;
  response['Summary.c2s6'] = models.Summary.rawAttributes.c2s6.values;
  response['Summary.c3s1'] = models.Summary.rawAttributes.c3s1.values;

  //GET Consulence and Risk enums
  response['Consulence.c1s2'] = models.Consulence.rawAttributes.c1s2.values;
  response['Risk.c1s1'] = models.Risk.rawAttributes.c1s1.values;

  //GET Analgesia enums
  response['Analgesia.c1s1'] = models.Analgesia.rawAttributes.c1s1.values;
  response['Analgesia.c1s2'] = models.Analgesia.rawAttributes.c1s2.values;
  response['Analgesia.c1s3'] = models.Analgesia.rawAttributes.c1s3.values;
  response['Analgesia.c1s5'] = models.Analgesia.rawAttributes.c1s5.values;
  response['Analgesia.c1s6'] = models.Analgesia.rawAttributes.c1s6.values;
  response['Analgesia.c1s9'] = models.Analgesia.rawAttributes.c1s9.values;
  response['Analgesia.c1s9a'] = models.Analgesia.rawAttributes.c1s9a.values;
  response['Analgesia.c2s2'] = models.Analgesia.rawAttributes.c2s2.values;
  response['Analgesia.c2s4'] = models.Analgesia.rawAttributes.c2s4.values;
  response['Therapy.c1s3'] = models.Therapy.rawAttributes.c1s3.values;
  response['Therapy.c1s3a'] = models.Therapy.rawAttributes.c1s3a.values;
  response['Therapy.c1s4'] = models.Therapy.rawAttributes.c1s4.values;
  response['Therapy.c1s4a'] = models.Therapy.rawAttributes.c1s4a.values;
  response['Therapy.c1s5'] = models.Therapy.rawAttributes.c1s5.values;
  response['Therapy.c1s5a'] = models.Therapy.rawAttributes.c1s5a.values;

  //GET Anestesia enums
  response['Anestesia.c1'] = models.Anestesia.rawAttributes.c1.values;
  response['Anestesia.c1s3'] = models.Anestesia.rawAttributes.c1s3.values;
  response['Anestesia.c2s1'] = models.Anestesia.rawAttributes.c2s1.values;
  response['Anestesia.c2s3'] = models.Anestesia.rawAttributes.c2s3.values;
  response['Anestesia.c2s3a'] = models.Anestesia.rawAttributes.c2s3a.values;
  response['Anestesia.c2s4'] = models.Anestesia.rawAttributes.c2s4.values;
  response['Anestesia.c2s4a'] = models.Anestesia.rawAttributes.c2s4a.values;
  response['Anestesia.c2s5'] = models.Anestesia.rawAttributes.c2s5.values;
  response['Anestesia.c2s5a'] = models.Anestesia.rawAttributes.c2s5a.values;
  response['Anestesia.c3s1'] = models.Anestesia.rawAttributes.c3s1.values;
  response['Anestesia.c3s2a'] = models.Anestesia.rawAttributes.c3s2a.values;
  response['Anestesia.c3s2b'] = models.Anestesia.rawAttributes.c3s2b.values;
  response['Anestesia.c3s3'] = models.Anestesia.rawAttributes.c3s3.values;
  response['Anestesia.c3s3a'] = models.Anestesia.rawAttributes.c3s3a.values;
  response['Anestesia.c3s4'] = models.Anestesia.rawAttributes.c3s4.values;
  response['Anestesia.c3s4a'] = models.Anestesia.rawAttributes.c3s4a.values;
  response['Anestesia.c3s5'] = models.Anestesia.rawAttributes.c3s5.values;
  response['Anestesia.c3s5a'] = models.Anestesia.rawAttributes.c3s5a.values;
  response['Anestesia.c4s1'] = models.Anestesia.rawAttributes.c4s1.values;
  response['Anestesia.c4s2'] = models.Anestesia.rawAttributes.c4s2.values;
  response['Anestesia.c4s3'] = models.Anestesia.rawAttributes.c4s3.values;
  response['Anestesia.c4s4'] = models.Anestesia.rawAttributes.c4s4.values;
  response['Anestesia.c4s6'] = models.Anestesia.rawAttributes.c4s6.values;
  response['Anestesia.c4s7'] = models.Anestesia.rawAttributes.c4s7.values;

  var whereClinicId = req.user.getDataValue('clinicId') ? {ClinicId : req.user.getDataValue('clinicId')} : {};

  models.Doctor.findAll({where : whereClinicId,attributes : ['id','name','surname','ClinicId','RoleId']}).then(function(doctors){
    response['Doctors'] = doctors;
    res.json(response);
  }).catch(function(error){
    res.json(error);
  });
}
