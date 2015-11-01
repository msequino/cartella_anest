"use strict";
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: {
      type : DataTypes.STRING,
      set : function(password){
        this.setDataValue('password',bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
      }
    }
  },{
    instanceMethods : {
      isValidPassword : function(pass){
        return bcrypt.compareSync(pass, this.getDataValue('password'));
      },
      read_info : function(){
        return {
          username : this.getDataValue("username")
        };
      }
    },
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return User;
};
