"use strict";

module.exports = function(sequelize, DataTypes) {
  var Doctor = sequelize.define("Doctor", {
    name: DataTypes.STRING,
    surname: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Doctor.belongsTo(models.Role);
        Doctor.belongsTo(models.Clinic);
      },
    }
  });

  return Doctor;
};
