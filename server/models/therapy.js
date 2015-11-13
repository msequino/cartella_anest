"use strict";

module.exports = function(sequelize, DataTypes) {
  var Therapy = sequelize.define("Therapy", {
    c1s1: {
      type : DataTypes.DATE,
      comment : "Data e ora somministrazione terapia"
    },
    c1s2a: {
      type : DataTypes.DATE,
      comment : "VAS prima",
      isValid : {
        min : 0,
        max : 10
      }
    },
    c1s2b: {
      type : DataTypes.DATE,
      comment : "VAS dopo",
      isValid : {
        min : 0,
        max : 10
      }
    },
    c1s3: {
      type : DataTypes.ENUM("Nessuna","Top-up","Infusione continua","PIEB","PCA","PCA+PEB"),
      comment : "Tecnica"
    },
    c1s3a: {
      type : DataTypes.ENUM("Peridurale","Subaracnoidea","Combinata"),
      comment : "Tipo somministrazione"
    },
    c1s4: {
      type : DataTypes.ENUM("Si","No"),
      comment : "Anestesia locale"
    },
    c1s4a: {
      type : DataTypes.ENUM("Nessuno","Ropivacaina","Levobupivacaina","Lidocaina","Bubivacaina","Altro"),
      comment : "Tipo"
    },
    c1s4b: {
      type : DataTypes.FLOAT,
      comment : "Quantità (ml)",
      isValid : {
        min : 0
      }
    },
    c1s4c: {
      type : DataTypes.FLOAT,
      comment : "Concentrazione (%)",
      isValid : {
        min : 0
      }
    },
    c1s5 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Oppioide"
    },
    c1s5a : {
      type : DataTypes.ENUM("Nessuno","Sufentanil","Morfina"),
      comment : "Farmaco"
    },
    c1s5b : {
      type : DataTypes.FLOAT,
      comment : "Quantità (mcg)"
    },
    c1s5c : {
      type : DataTypes.FLOAT,
      comment : "Volume (ml)"
    },
    c2s1 : {
      type : DataTypes.FLOAT,
      comment : "Vol. bolo (ml)"
    },
    c2s2 : {
      type : DataTypes.FLOAT,
      comment : "Intervallo tra i boli (ml)"
    },
    c2s3 : {
      type : DataTypes.FLOAT,
      comment : "Bolo a richiesta (ml)"
    },
    c2s4 : {
      type : DataTypes.FLOAT,
      comment : "Lockout (min)"
    },
    c2s5 : {
      type : DataTypes.FLOAT,
      comment : "Velocità infusione (ml/h)"
    }


  }, {
    classMethods: {
      associate: function(models) {
        Therapy.belongsTo(models.Analgesia);
      }
    },
  });

  return Therapy;
};
