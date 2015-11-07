
var models = require("../models");
module.exports.getUsers = function(req,res,next){
  models.User.findAll({attributes:['id','name','surname','active']}).then(function(users){
    res.json(users);
  });
}

module.exports.getUser = function(req,res,next){
  models.User.findOne({where : {id:req.params.id}, attributes:['id','name','surname','username','active','GroupId','ClinicId']}).then(function(user){
    res.json(user);
  });
}

module.exports.getUserByUsername = function(req,res,next){
  models.User.findOne({where : {username:req.params.username}, attributes:['id','name','surname','username','active','GroupId','ClinicId']}).then(function(user){
    res.json(user);
  });
}

module.exports.insertUser = function(req,res,next){
  models.User.create(req.body).then(function(user){
    res.sendStatus(200);
  }).catch(function(error){
    res.json(error);
  });
}

module.exports.updateUser = function(req,res,next){
  models.User.findOne({where : {id : req.params.id}}).then(function(user){
    if(user)
      user.updateAttributes(req.body).then(function(u){
        res.json(u);
      });
  }).catch(function(error){
    res.json(error);
  });
}
