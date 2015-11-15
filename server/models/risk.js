"use strict";

module.exports = function(sequelize, DataTypes) {
  var Risk = sequelize.define("Risk", {
    c1s1 : {
      type : DataTypes.ENUM("RESPIRATORIO","CARDIO-VASCOLARE","METABOLICO","NEUROLOGICO","EPATICO","RENALE","TROMBO-EMBOLICO ED EMORRAGICO","ALLERGICO","OSTETRICO","Altro"),
      comment : "Patologia"
    },
    c1s2 : {
      type : DataTypes.STRING,
      comment : "Descrizione"
    }

  },
  {
    classMethods: {
      associate: function(models) {
        Risk.belongsTo(models.Summary);
      }
    }
  });

  return Risk;
};
