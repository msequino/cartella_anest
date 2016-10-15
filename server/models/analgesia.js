"use strict";

module.exports = function(sequelize, DataTypes) {
  var Analgesia = sequelize.define("Analgesia", {
    c1s1: {
      type : DataTypes.ENUM("Peridurale","Subaracnoidea","Combinata spino/peridurale"),
      comment : "Procedura: "
    },
    c1s2: {
      type : DataTypes.ENUM("L1-L2","L2-L3","L3-L4","ALTRO"),
      comment : "Interspazio 1",
      isValid : {
        min : 0
      }
    },
    c1s3: {
      type : DataTypes.ENUM("16G","18G"),
      comment : "Ago 1",
      isValid : {
        min : 0
      }
    },
    c1s4: {
      type : DataTypes.INTEGER,
      comment : "Catetere (cm)",
      isValid :{
        min : 0,
        max : 10
      }
    },
    c1s5: {
      type : DataTypes.ENUM("L1-L2","L2-L3","L3-L4","ALTRO"),
      comment : "Interspazio 2",
      isValid : {
        min : 0
      }
    },
    c1s6: {
      type : DataTypes.ENUM("25G","27G"),
      comment : "Ago 2",
      isValid : {
        min : 0
      }
    },
    c1s7: {
      type : DataTypes.STRING,
      comment : "Difficoltà tecniche"
    },
    c1s8: {
      type : DataTypes.STRING,
      comment : "Complicanze"
    },
    c1s9: {
      type : DataTypes.ENUM("Si","No"),
      comment : "Dose test"
    },
    c1s9a: {
      type : DataTypes.ENUM("Ropivacaina","Levobupivacaina","Lidocaina","Bubivacaina","ALTRO"),
      comment : "Dose test farmaco"
    },
    c1s9b: {
      type : DataTypes.FLOAT,
      comment : "Quantità (ml)",
      isValid : {
        min : 0
      }
    },
    c1s9c: {
      type : DataTypes.FLOAT,
      comment : "Concentrazione (%)",
      isValid : {
        min : 0
      }
    },
    c1s10a: {
      type : DataTypes.DATE,
      comment : "Posizionamento catetere",
      get : function(){
        if(this.getDataValue('c1s10a')){
          var date = new Date(this.getDataValue('c1s10a'));
          return date.toISOString().substr(0,date.toISOString().lastIndexOf(":"));
        }
      }
    },
    c2a: {
      type : DataTypes.ENUM('Si','No'),
      comment : "Induzione al parto"
    },
    c2b: {
      type : DataTypes.ENUM('MECCANICA','OSSITOCINA','PROSTAGLANDINE'),
      comment : "Metodologia"
    },
    c2s1: {
      type : DataTypes.DATE,
      comment : "Data e ora Parto",
      get : function(){
        if(this.getDataValue('c2s1')){
          var date = new Date(this.getDataValue('c2s1'));
          return date.toISOString().substr(0,date.toISOString().lastIndexOf(":"));
        }
      }
    },
    c2s2: {
      type : DataTypes.ENUM("SPONTANEO","KRISTELLER","VENTOSA","CESAREO"),
      comment : "Tipo Parto"
    },
    c2s3a: {
      type : DataTypes.INTEGER,
      comment : "Apgar alla nascita",
      isValid :{
        min : 0,
        max : 10
      }
    },
    c2s3b: {
      type : DataTypes.INTEGER,
      comment : "Apgar a 5' dalla nascita",
      isValid :{
        min : 0,
        max : 10
      }
    },
    c2s4: {
      type : DataTypes.ENUM("Si","No"),
      comment : "Ossitocina"
    },
    c2s4a: {
      type : DataTypes.FLOAT,
      comment : "Quantità (ml)"
    },
    c2s5: {
      type : DataTypes.STRING,
      comment : "Note anestesiologiche"
    },
    c2s6: {
      type : DataTypes.DATE,
      comment : "Inizio periodo espulsivo",
      get : function(){
        if(this.getDataValue('c2s6')){
          var date = new Date(this.getDataValue('c2s6'));
          return date.toISOString().substr(0,date.toISOString().lastIndexOf(":"));
        }
      }
    },
    c2s7: {
      type : DataTypes.STRING,
      comment : "Note ostetriche"
    },
    c2s8a: {
      type : DataTypes.FLOAT,
      comment : "be arterioso"
    },
    c2s8b: {
      type : DataTypes.FLOAT,
      comment : "be venoso"
    },
    c2s9a: {
      type : DataTypes.FLOAT,
      comment : "ph arterioso"
    },
    c2s9b: {
      type : DataTypes.FLOAT,
      comment : "ph venoso"
    },
    c2s10: {
      type : DataTypes.ENUM("Si","No"),
      comment : "Temperatura"
    },
  },
  {
    classMethods: {
      associate: function(models) {
        Analgesia.belongsTo(models.Patient);
      }
    }
  });

  return Analgesia;
};
