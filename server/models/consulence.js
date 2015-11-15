"use strict";

module.exports = function(sequelize, DataTypes) {
  var Consulence = sequelize.define("Consulence", {
    c1s1 : {
      type : DataTypes.DATEONLY,
      comment : "Data"
    },
    c1s2 : {
      type : DataTypes.ENUM("CARDIOLOGICA","DIABETOLOGICA","EMATOLOGICA","EMOCOAGULATIVA","ENDOCRINOLOGA","NEUROLOGICA","PSICHIATRICA"),
      comment : "Consulenza"
    },
    c1s3 : {
      type : DataTypes.STRING,
      comment : "Descrizione"
    }

  },
  {
    classMethods: {
      associate: function(models) {
        Consulence.belongsTo(models.Summary);
      }
    }
  });

  return Consulence;
};
