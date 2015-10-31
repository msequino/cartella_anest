"use strict";

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Role.hasMany(models.Doctor);
      }
    }
  });

  return Role;
};
