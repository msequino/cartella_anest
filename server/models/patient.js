"use strict";

module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    birth : DataTypes.DATEONLY,
    code : DataTypes.STRING,
    finalized : {
      type : DataTypes.INTEGER,
      defaultValue : 0
    }
  }, {
    classMethods: {
      associate: function(models) {
        Patient.belongsTo(models.Clinic);
        Patient.belongsTo(models.Study);
      },
    }
  });

  return Patient;
};
