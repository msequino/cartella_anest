"use strict";

module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    c1: {
      type : DataTypes.STRING,
      comment : "Terapia infusionale post operatoria"
    },
    c2: {
      type : DataTypes.STRING,
      comment : "Analgesia post operatoria"
    },
    c3: {
      type : DataTypes.STRING,
      comment : "Parametri da monitorare"
    },
    c4: {
      type : DataTypes.STRING,
      comment : "Segnalazioni"
    }
  },{
    classMethods: {
      associate: function(models) {
        Note.belongsTo(models.Patient);
      }
    },
  });

  return Note;
};
