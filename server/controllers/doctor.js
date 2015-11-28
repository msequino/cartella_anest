
var models = require("../models"),
  log = require("../config/winston");

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
    log.log('info',req.user.id + ' CREATE doctor '+ JSON.stringify(doctor));

    res.json({id : doctor.getDataValue('id')});
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}

module.exports.updateDoctor = function(req,res,next){
  models.Doctor.findOne({where : {id : req.params.id}}).then(function(doctor){
    if(doctor)
      doctor.updateAttributes(req.body).then(function(d){
        log.log('info',req.user.id + ' UPDATED doctor '+ JSON.stringify(doctor) );
        res.json(d);
      }).catch(function(error){
        log.log('error',error);
        res.status(404).send(error.errors[0].message);
      });
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}
