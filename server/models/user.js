"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {

      },
      isValidPassword : function(pass){
        return this.password == pass;
      },
      read_info : function(){
        return {
          username : this.getDataValue("username")
        };
      }
    }
  });

  return User;
};
