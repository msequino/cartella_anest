"use strict";

module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    c1s1 : {
      type : DataTypes.DATE,
      comment : "Data e ora di quando l'operatore è entrato in SO"
    }
  },
  {
    classMethods: {
      associate: function(models) {
        Team.belongsTo(models.Doctor);
        Team.belongsTo(models.Analgesia);
      }
    }
  });

  return Team;
};
