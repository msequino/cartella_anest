"use strict";

module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    c1s1 : {
      type : DataTypes.DATE,
      comment : "Data e ora di quando l'operatore è entrato in SO",
      get : function(){

        if(this.getDataValue('c1s1')){
          var date = new Date(this.getDataValue('c1s1'));
          return date.toISOString().substr(0,date.toISOString().lastIndexOf(":"));
        }
      }
    }
  },
  {
    classMethods: {
      associate: function(models) {
        Team.belongsTo(models.Doctor);
        Team.belongsTo(models.Patient);
      }
    }
  });

  return Team;
};
