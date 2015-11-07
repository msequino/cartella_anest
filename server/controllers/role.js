
var models = require("../models");
module.exports.getRoles = function(req,res,next){
  models.Role.findAll().then(function(data){
    res.json(data);
  });
}
