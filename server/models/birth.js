"use strict";

module.exports = function(sequelize, DataTypes) {
  var Birth = sequelize.define("Birth", {
    c1s1: {
      type : DataTypes.DATE,
      comment : "Data e ora estrazione feto",
      get : function(){
        if(this.getDataValue('c1s1')){
          var date = new Date(this.getDataValue('c1s1'));
          return date.toISOString().substr(0,date.toISOString().lastIndexOf(":"));
        }
      }
    },
    c1s2a: {
      type : DataTypes.INTEGER,
      comment : "Apgar A 1' dalla nascita",
      isValid :{
        min : 0,
        max : 10
      }
    },
    c1s2b: {
      type : DataTypes.INTEGER,
      comment : "Apgar a 5' dalla nascita",
      isValid :{
        min : 0,
        max : 10
      }
    },
    c1s3a: {
      type : DataTypes.FLOAT,
      comment : "be arterioso"
    },
    c1s3b: {
      type : DataTypes.FLOAT,
      comment : "be venoso"
    },
    c1s4a: {
      type : DataTypes.FLOAT,
      comment : "ph arterioso"
    },
    c1s4b: {
      type : DataTypes.FLOAT,
      comment : "ph venoso"
    },
    c1s5 :{
      type : DataTypes.ENUM("Si","No"),
      comment : "Ricovero in TIN"
    },
    c1s6 :{
      type : DataTypes.ENUM("Si","No"),
      comment : "Necessità assistenza"
    }
  },
  {
    classMethods: {
      associate: function(models) {
        Birth.belongsTo(models.Patient);
      }
    }
  });

  return Birth;
};
