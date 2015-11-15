"use strict";

module.exports = function(sequelize, DataTypes) {
  var Analgesia = sequelize.define("Analgesia", {
    c1s1: {
      type : DataTypes.ENUM("Si","No"),
      comment : "Ha avuto una procedura anestesiologica"
    },
    c1s1a: {
      type : DataTypes.BOOLEAN,
      comment : "Procedura: Peridurale"
    },
    c1s1b: {
      type : DataTypes.BOOLEAN,
      comment : "Procedura: Subaracnoidea"
    },
    c1s1c: {
      type : DataTypes.BOOLEAN,
      comment : "Procedura: Combinata spino/peridurale"
    },
    c1s2: {
      type : DataTypes.ENUM("Nessuno","L1-L2","L2-L3","L3-L4","Altro"),
      comment : "Interspazio 1",
      isValid : {
        min : 0
      }
    },
    c1s3: {
      type : DataTypes.ENUM("Nessuno","16G","18G"),
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
      type : DataTypes.ENUM("Nessuno","L1-L2","L2-L3","L3-L4","Altro"),
      comment : "Interspazio 2",
      isValid : {
        min : 0
      }
    },
    c1s6: {
      type : DataTypes.ENUM("Nessuno","16G","18G"),
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
      type : DataTypes.ENUM("Ropivacaina","Levobupivacaina","Lidocaina","Bubivacaina","Altro"),
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
      comment : "Data e ora Parto"
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
      comment : "Inizio periodo espulsivo"
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

  },
  {
    classMethods: {
      associate: function(models) {
        Analgesia.belongsTo(models.Summary);
      }
    }
  });

  return Analgesia;
};
