"use strict";

module.exports = function(sequelize, DataTypes) {
  var Clinic = sequelize.define("Clinic", {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Clinic.hasMany(models.Doctor);
      }
    }
  });

  return Clinic;
};
