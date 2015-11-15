
var models = require("../models");
module.exports.getStudies = function(req,res,next){
  models.Study.findAll().then(function(data){
    res.json(data);
  });
}
