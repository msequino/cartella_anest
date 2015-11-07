"use strict";

module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    birth : DataTypes.DATEONLY,
    code : DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Patient.belongsTo(models.Clinic);
      },
    }
  });

  return Patient;
};
