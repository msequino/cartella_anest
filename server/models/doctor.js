"use strict";

module.exports = function(sequelize, DataTypes) {
  var Doctor = sequelize.define("Doctor", {
    name: DataTypes.STRING,
    surname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Doctor.belongsTo(models.Clinic);
        Doctor.belongsTo(models.Role);
      },
    }
  });

  return Doctor;
};
