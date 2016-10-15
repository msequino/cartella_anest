
var models = require("../models"),
  sequelize = require("sequelize"),
  log = require("../config/winston");

module.exports.getPatients = function(req,res,next){
  var clinic = !req.user.getDataValue('ClinicId') ? {} : {ClinicId : req.user.getDataValue('ClinicId')};

  var whereClinicId = req.user.getDataValue('ClinicId') ? "WHERE p.ClinicId = :clinicId" : "";

  var paramsClinicId = req.user.getDataValue('ClinicId') ? {clinicId : req.user.getDataValue('ClinicId')} : {};

  models.sequelize.query("SELECT p.id,s.c1s1,s.c1s3,s.c1s2,CONCAT(d.surname, ' ',d.name) AS doctor,ag.id AS agid,an.id AS anid,st.acronym,p.finalized "+
    "FROM Patients p LEFT JOIN Summaries s ON p.id=s.PatientId "+
    " LEFT JOIN Analgesia ag ON p.id=ag.PatientId "+
    " LEFT JOIN Anestesia an ON p.id=an.PatientId "+
    " LEFT JOIN Doctors d ON s.DoctorId=d.id "+
    " LEFT JOIN Studies st ON p.StudyId=st.id "+
    "" + whereClinicId + " ORDER BY p.id", {replacements : paramsClinicId,
          type:models.sequelize.QueryTypes.SELECT}).then(function(data){
            console.log(data.length);
            res.json(data);

  });
}

module.exports.getPatient = function(req,res,next){
  var response = {};
  models.Patient.findOne({where : {id:req.params.id}}).then(function(patient){
    models.Summary.findOne({where : {PatientId:req.params.id}}).then(function(summary){
      models.Consulence.findAll({where : {PatientId:req.params.id}}).then(function(consulences){
        models.Risk.findAll({where : {PatientId:req.params.id}}).then(function(risks){
          models.Analgesia.findOne({where : {PatientId:req.params.id}}).then(function(analgesia){
            models.Anestesia.findOne({where : {PatientId:req.params.id}}).then(function(anestesia){
              models.Team.findAll({where : {PatientId:req.params.id}}).then(function(teams){
                models.Therapy.findAll({where : {PatientId:req.params.id}}).then(function(therapies){
                  models.Note.findOne({where : {PatientId:req.params.id}}).then(function(note){
                    response['Patient'] = patient;

                    response['Summary'] = summary;

                    response['Consulence'] = consulences;
                    response['Risk'] = risks;

                    response['Analgesia'] = analgesia;
                    response['Team'] = teams;
                    response['Therapy'] = therapies;

                    response['Anestesia'] = anestesia;

                    response['Note'] = note;
                    res.json(response);
                  }).catch(function(error){
                    res.json(error);
                  });
                }).catch(function(error){
                  res.json(error);
                });
              }).catch(function(error){
                res.json(error);
              });

            }).catch(function(error){
              res.json(error);
            });

          }).catch(function(error){
            res.json(error);
          });

        }).catch(function(error){
          res.json(error);
        });
      }).catch(function(error){
        res.json(error);
      });
    }).catch(function(error){
      res.json(error);
    });
  }).catch(function(error){
    res.json(error);
  });
}

module.exports.insertPatient = function(req,res,next){
  req.body.name = null;
  req.body.surname = null;
  req.body.code = null;
  models.Patient.create(req.body).then(function(p){
    log.log('info',req.user.id + ' CREATE patient '+ JSON.stringify(p));
    res.json(p);
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}

module.exports.updatePatient = function(req,res,next){
  models.Patient.findOne({where : {id : req.params.id}}).then(function(patient){

    if(patient)
      patient.updateAttributes(req.body).then(function(p){
        log.log('info',req.user.id + ' UPDATE patient '+ JSON.stringify(p));
        res.json(p);
      }).catch(function(error){
        log.log('error',error);
        res.status(404).send(error.errors[0].message);
      });
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
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
  response['Analgesia.c1'] = ['Si','No'];
  response['Analgesia.c1s1'] = models.Analgesia.rawAttributes.c1s1.values;
  response['Analgesia.c1s2'] = models.Analgesia.rawAttributes.c1s2.values;
  response['Analgesia.c1s3'] = models.Analgesia.rawAttributes.c1s3.values;
  response['Analgesia.c1s5'] = models.Analgesia.rawAttributes.c1s5.values;
  response['Analgesia.c1s6'] = models.Analgesia.rawAttributes.c1s6.values;
  response['Analgesia.c1s9'] = models.Analgesia.rawAttributes.c1s9.values;
  response['Analgesia.c1s9a'] = models.Analgesia.rawAttributes.c1s9a.values;
  response['Analgesia.c2a'] = models.Analgesia.rawAttributes.c2a.values;
  response['Analgesia.c2b'] = models.Analgesia.rawAttributes.c2b.values;
  response['Analgesia.c2s2'] = models.Analgesia.rawAttributes.c2s2.values;
  response['Analgesia.c2s4'] = models.Analgesia.rawAttributes.c2s4.values;
  response['Analgesia.c2s10'] = models.Analgesia.rawAttributes.c2s10.values;
  response['Therapy.c1s3'] = models.Therapy.rawAttributes.c1s3.values;
  response['Therapy.c1s3a'] = models.Therapy.rawAttributes.c1s3a.values;
  response['Therapy.c1s4'] = models.Therapy.rawAttributes.c1s4.values;
  response['Therapy.c1s4a'] = models.Therapy.rawAttributes.c1s4a.values;
  response['Therapy.c1s5'] = models.Therapy.rawAttributes.c1s5.values;
  response['Therapy.c1s5a'] = models.Therapy.rawAttributes.c1s5a.values;

  //GET Anestesia enums
  response['Anestesia.c1'] = ['Si','No'];
  response['Anestesia.c1s2'] = models.Anestesia.rawAttributes.c1s2.values;
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

  response['Birth.c1s5'] = models.Birth.rawAttributes.c1s5.values;
  response['Birth.c1s6'] = models.Birth.rawAttributes.c1s6.values;

  var whereClinicId = req.user.getDataValue('clinicId') ? {ClinicId : req.user.getDataValue('clinicId')} : {};

  models.Doctor.findAll({where : whereClinicId,attributes : ['id','name','surname','ClinicId','RoleId']}).then(function(doctors){
    response['Doctors'] = doctors;
    models.Role.findAll().then(function(roles){
      response['Roles'] = roles;
      res.json(response);
    }).catch(function(error){
      res.json(error);
    });
  }).catch(function(error){
    res.json(error);
  });
}

module.exports.insertSummary = function(req,res,next){
  models.Summary.create(req.body).then(function(summary){
    log.log('info',req.user.id + ' CREATE Summary '+ JSON.stringify(summary));
    res.json(summary);
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}
module.exports.updateSummary = function(req,res,next){
  models.Summary.findOne({where : {id : req.params.id}}).then(function(data){
    if(data)
      data.updateAttributes(req.body).then(function(p){
        log.log('info',req.user.id + ' UPDATE Summary '+ JSON.stringify(p));
        res.json(p);
      }).catch(function(error){
        log.log('error',error);
        res.status(404).send(error.errors[0].message);
      });
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}

module.exports.insertAnalgesia = function(req,res,next){
  models.Analgesia.create(req.body).then(function(analgesia){
    log.log('info',req.user.id + ' CREATE Analgesia '+ JSON.stringify(analgesia));
    res.json(analgesia);
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}
module.exports.updateAnalgesia = function(req,res,next){
  models.Analgesia.findOne({where : {id : req.params.id}}).then(function(data){
    if(data)
      data.updateAttributes(req.body).then(function(p){
        log.log('info',req.user.id + ' UPDATE Analgesia '+ JSON.stringify(p));
        res.json(p);
      }).catch(function(error){
        log.log('error',error);
        res.status(404).send(error.errors[0].message);
      });
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}

module.exports.insertAnestesia = function(req,res,next){
  models.Anestesia.create(req.body).then(function(anestesia){
    log.log('info',req.user.id + ' CREATE Anestesia '+ JSON.stringify(anestesia));
    res.json(anestesia);
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}
module.exports.updateAnestesia = function(req,res,next){
  models.Anestesia.findOne({where : {id : req.params.id}}).then(function(data){
    if(data)
      data.updateAttributes(req.body).then(function(p){
        log.log('info',req.user.id + ' UPDATE Anestesia '+ JSON.stringify(p));
        res.json(p);
      }).catch(function(error){
        log.log('error',error);
        res.status(404).send(error.errors[0].message);
      });
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}

module.exports.insertNote = function(req,res,next){
  models.Note.create(req.body).then(function(note){
    log.log('info',req.user.id + ' CREATE Note '+ JSON.stringify(note));
    res.json(note);
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}
module.exports.updateNote = function(req,res,next){
  models.Note.findOne({where : {id : req.params.id}}).then(function(data){
    if(data)
      data.updateAttributes(req.body).then(function(p){
        log.log('info',req.user.id + ' UPDATE Note '+ JSON.stringify(p));
        res.json(p);
      }).catch(function(error){
        log.log('error',error);
        res.status(404).send(error.errors[0].message);
      });
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}

module.exports.insertBirth = function(req,res,next){
  models.Birth.create(req.body).then(function(note){
    log.log('info',req.user.id + ' CREATE Birth '+ JSON.stringify(note));
    res.json(note);
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}
module.exports.updateBirth = function(req,res,next){
  models.Birth.findOne({where : {id : req.params.id}}).then(function(data){
    if(data)
      data.updateAttributes(req.body).then(function(p){
        log.log('info',req.user.id + ' UPDATE Birth '+ JSON.stringify(p));
        res.json(p);
      }).catch(function(error){
        log.log('error',error);
        res.status(404).send(error.errors[0].message);
      });
  }).catch(function(error){
    log.log('error',error);
    res.status(404).send(error.errors[0].message);
  });
}

module.exports.insertRisk = function(req,res,next){

  req.body.forEach(function(element,index, array) {
    models.Risk.upsert(req.body[index]).then();
  });

  models.Risk.findAll({where : {PatientId : req.params.id}}).then(function(data){
    res.json(data);
  });

}
module.exports.deleteRisk = function(req,res,next){
  models.Risk.findOne({where : {id : req.params.id}}).then(function(risk) {
    risk.destroy().then(function(data) {
      res.json(200);
    })
  })
}

module.exports.insertConsulence = function(req,res,next){

  req.body.forEach(function(element,index, array) {
    models.Consulence.upsert(req.body[index]).then();
  });

  models.Consulence.findAll({where : {PatientId : req.params.id}}).then(function(data){
    res.json(data);
  });

}
module.exports.deleteConsulence = function(req,res,next){
  models.Consulence.findOne({where : {id : req.params.id}}).then(function(consulence) {
    consulence.destroy().then(function(data) {
      res.json(200);
    })
  })
}

module.exports.insertTeam = function(req,res,next){

  req.body.forEach(function(element,index, array) {
    models.Team.upsert(req.body[index]).then();
  });

  models.Team.findAll({where : {PatientId : req.params.id}}).then(function(data){
    res.json(data);
  });

}
module.exports.deleteTeam = function(req,res,next){
  models.Team.findOne({where : {id : req.params.id}}).then(function(team) {
    team.destroy().then(function(data) {
      res.json(200);
    })
  })
}

module.exports.insertTherapy = function(req,res,next){

  req.body.forEach(function(element,index, array) {
    models.Therapy.upsert(req.body[index]).then();
  });

  models.Therapy.findAll({where : {PatientId : req.params.id}}).then(function(data){
    res.json(data);
  });

}
module.exports.deleteTherapy = function(req,res,next){
  models.Therapy.findOne({where : {id : req.params.id}}).then(function(therapy) {
    therapy.destroy().then(function(data) {
      res.json(200);
    })
  })
}
