
var models = require("../models");

module.exports.getPatients = function(req,res,next){
  var clinic = !req.user.getDataValue('ClinicId') ? {} : {ClinicId : req.user.getDataValue('ClinicId')};
  models.Patient.findAll({where : clinic}).then(function(data){
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
