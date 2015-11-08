"use strict";

module.exports = function(sequelize, DataTypes) {
  var Summary = sequelize.define("Summary", {
    c1s1: {
      type : DataTypes.DATEONLY,
      comment : "Data visita"
    },
    c1s2: {
      type : DataTypes.ENUM("SSN","LP"),
      comment : "Tipo visita"
    },
    c1s3: {
      type : DataTypes.DATEONLY,
      comment : "Data presunto parto"
    },
    c1s4: {
      type : DataTypes.INTEGER,
      comment : "Parità",
      isValid : {
        min : 0
      }
    },
    c1s5: {
      type : DataTypes.INTEGER,
      comment : "Peso (kg)"
    },
    c1s6: {
      type : DataTypes.INTEGER,
      comment : "Altezza (cm)"
    },
    c2s1: {
      type : DataTypes.STRING,
      comment : "Esame Obiettivo"
    },
    c2s2: {
      type : DataTypes.ENUM("SI","NO"),
      comment : "Precedenti anestesie"
    },
    c2s3a: {
      type : DataTypes.BOOLEAN,
      comment : "Tipo anestesia: Generale"
    },
    c2s3b: {
      type : DataTypes.BOOLEAN,
      comment : "Tipo anestesia: Locale"
    },
    c2s3c: {
      type : DataTypes.BOOLEAN,
      comment : "Tipo anestesia: Locoregionale"
    },
    c2s4: {
      type : DataTypes.STRING,
      comment : "Problemi anestesia"
    },
    c2s5: {
      type : DataTypes.STRING,
      comment : "Terapia in corso"
    },
    c2s6: {
      type : DataTypes.ENUM("1","2","3","4"),
      comment : "Mallampati"
    },
    c3s1: {
      type : DataTypes.ENUM("1","2","3","4","5","E"),
      comment : "Classe ASA Ostetrica"
    },

  },
  {
    classMethods: {
      associate: function(models) {
        Summary.belongsTo(models.Patient);
        Summary.belongsTo(models.Doctor);
      }
    }
  });

  return Summary;
};
