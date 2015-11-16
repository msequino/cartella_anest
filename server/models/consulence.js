"use strict";

module.exports = function(sequelize, DataTypes) {
  var Consulence = sequelize.define("Consulence", {
    c1s1 : {
      type : DataTypes.DATEONLY,
      comment : "Data",
      get      : function()  {

        if(this.getDataValue('c1s1')){
          var date = new Date(this.getDataValue('c1s1')).toISOString();

          // 'this' allows you to access attributes of the instance
          return date.substr(0,date.indexOf("T"));
        }
      }
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
        Consulence.belongsTo(models.Patient);
      }
    }
  });

  return Consulence;
};
