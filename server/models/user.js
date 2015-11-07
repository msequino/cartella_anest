"use strict";
var bcrypt   = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    username: {
      type : DataTypes.STRING,
      unique : true
    },
    password: {
      type : DataTypes.STRING,
      set : function(password){
        this.setDataValue('password',bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
      }
    },
    active : DataTypes.BOOLEAN

  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Group);
        User.belongsTo(models.Clinic);
      }
    },
    instanceMethods : {
      isValidPassword : function(pass){
        return bcrypt.compareSync(pass, this.getDataValue('password'));
      },
      read_info : function(){
        return {
          username : this.getDataValue("username")
        };
      },
      isAdmin : function(){
        return this.getDataValue('GroupId') == 1;
      },
    },
  });

  return User;
};
