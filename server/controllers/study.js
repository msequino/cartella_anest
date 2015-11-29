
var models = require("../models"),
  log = require('../config/winston');

module.exports.getStudies = function(req,res,next){
  models.Study.findAll().then(function(data){
    res.json(data);
  });
}

module.exports.getStudyPatient = function(req,res,next){
  var response = {};
  /* TODO
    -- controlla formati datetime-local (meglio se in formato 24) usa il computer del lavoro
    -- problema quantità farmaci;
    -- vedi etichette concentrazione;
    perchè vm.Anestesia e vm.Analgesia non si aggiornano??? scrivi su stack
     */
  models.sequelize.query("SELECT a.c1s10a AS InsCatetere,t.c1s1 AS InsBolo,a.c2s6 AS InEsp,a.c2s1 AS Parto,TIMEDIFF(IF(an.c2s2 IS NOT NULL, an.c2s2 ,a.c2s1),t.c1s1) AS dAnalgesia, a.c2s7 AS Complicanze FROM Analgesia AS a INNER JOIN Therapies AS t ON a.PatientId=t.PatientId LEFT JOIN Anestesia AS an ON a.PatientId=an.PatientId WHERE a.PatientId = :id ORDER BY t.c1s1 ASC LIMIT 1" ,{replacements : {id : req.params.id},
        type:models.sequelize.QueryTypes.SELECT}).then(function(data){
          response['firstquery'] = data[0];
          models.sequelize.query("SELECT SUM(c1s2a+c1s2b) AS NumeratoreNRS , COUNT(*) AS DenominatoreNRS, SUM(IF(c1s4 = 'Si',c1s4b*c1s4c/100,0)) AS Anestetico, SUM(IF(c1s5 = 'Si',c1s5b*c1s5c/100,0)) AS Oppioide, SUM(c1s1h) AS TimeH, SUM(c1s1m) AS TimeM, GROUP_CONCAT(DISTINCT c1s4a SEPARATOR ', ') AS FarmaciAnestetici,GROUP_CONCAT(DISTINCT c1s5a SEPARATOR ', ') AS FarmaciOppioidi FROM Therapies WHERE PatientId = :id GROUP BY PatientId" , {replacements : {id : req.params.id},
                type:models.sequelize.QueryTypes.SELECT}).then(function(data){

                  response['secondquery'] = data[0];
                  models.sequelize.query("SELECT c1s2a AS StartNrs FROM Therapies WHERE PatientId = :id AND c1s1 = (SELECT MIN(c1s1) FROM Therapies WHERE PatientId = :id)" , {replacements : {id : req.params.id},
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
