"use strict";

module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    c1s1 : {
      type : DataTypes.DATE,
      comment : "Date and Hour member comes in"
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
