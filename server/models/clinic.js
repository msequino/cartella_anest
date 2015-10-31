"use strict";

module.exports = function(sequelize, DataTypes) {
  var Clinic = sequelize.define("Clinic", {
    title: DataTypes.STRING
  },
  {
      timestamps : false
  }, {
    classMethods: {
      associate: function(models) {
        Clinic.hasMany(models.Doctor);
      }
    },
  });

  return Clinic;
};
