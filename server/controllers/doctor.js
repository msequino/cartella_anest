
var models = require("../models");

module.exports.getDoctors = function(req,res,next){
  var clinic = !req.user.getDataValue('ClinicId') ? {} : {ClinicId : req.user.getDataValue('ClinicId')};
  models.Doctor.findAll({where : clinic}).then(function(data){
    res.json(data);
  });
}

module.exports.getDoctor = function(req,res,next){
  models.Doctor.findOne({where : {id:req.params.id}}).then(function(user){
    res.json(user);
  });
}

module.exports.insertDoctor = function(req,res,next){
  models.Doctor.create(req.body).then(function(doctor){
    res.json(doctor);
  }).catch(function(error){
    res.json(error);
  });
}

module.exports.updateDoctor = function(req,res,next){
  models.Doctor.findOne({where : {id : req.params.id}}).then(function(doctor){
    if(doctor)
      doctor.updateAttributes(req.body).then(function(d){
        res.json(d);
      });
  }).catch(function(error){
    res.json(error);
  });
}
