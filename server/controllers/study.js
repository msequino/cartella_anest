
var models = require("../models"),
  log = require('../config/winston');

module.exports.getStudies = function(req,res,next){
  models.Study.findAll().then(function(data){
    res.json(data);
  });
}

module.exports.getStudyPatient = function(req,res,next){
  var response = {};
  models.sequelize.query("SELECT c1s10a,c1s10b,c2s1,c2s6,TIMEDIFF(c2s1,c1s10b) AS dAnalgesia, c2s10a AS StartNrs, c2s10b AS MeanNrs, c2s7 AS Complicanze, c1s10ch AS timeH, c1s10cm AS timeM FROM Analgesia WHERE PatientId = :id" , {replacements : {id : req.params.id},
        type:models.sequelize.QueryTypes.SELECT}).then(function(data){
          response['firstquery'] = data[0];
          models.sequelize.query("SELECT SUM(c1s2a+c1s2b)/(2*COUNT(*)) AS MeanVas, SUM(IF(c1s4 = 'Si',c1s4b*c1s4c/100,0)) AS Anestetico, SUM(IF(c1s5 = 'Si',c1s5b*c1s5c/100,0)) AS Oppioide, GROUP_CONCAT(DISTINCT c1s4a SEPARATOR ', ') AS FarmaciAnestetici,GROUP_CONCAT(DISTINCT c1s5a SEPARATOR ', ') AS FarmaciOppioidi FROM Therapies WHERE PatientId = :id GROUP BY PatientId" , {replacements : {id : req.params.id},
                type:models.sequelize.QueryTypes.SELECT}).then(function(data){

                  response['secondquery'] = data[0];
                  models.sequelize.query("SELECT c1s2a FROM Therapies WHERE PatientId = :id AND c1s1 = (SELECT MIN(c1s1) FROM Therapies WHERE PatientId = :id)" , {replacements : {id : req.params.id},
                        type:models.sequelize.QueryTypes.SELECT}).then(function(data){

                          response['thirdquery'] = data[0];
                          models.sequelize.query("SELECT c.title,s.c1s1 FROM Summaries s INNER JOIN Patients p ON s.PatientId=p.id INNER JOIN Clinics c ON p.ClinicId=c.id WHERE PatientId = :id" , {replacements : {id : req.params.id},
                                type:models.sequelize.QueryTypes.SELECT}).then(function(data){

                                  response['header'] = data[0];
                                  res.json(response);
                          });
                  });
          });
  });
}

module.exports.insertStudy = function(req,res,next){
  models.Study.create(req.body).then(function(s){
    log.log('info',req.user.id + ' CREATE study '+ s.id);
    res.json({id:s.id});
  }).catch(function(error){
    log.log('error',error);
    res.json(error);
  });
}
