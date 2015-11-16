"use strict";

module.exports = function(sequelize, DataTypes) {
  var Anestesia = sequelize.define("Anestesia", {
    c1s1: {
      type : DataTypes.DATE,
      comment : "Inizio estensione blocco",
      get : function(){
        if(this.getDataValue('c1s1')){
          var date = new Date(this.getDataValue('c1s1'));
          return date.toISOString().substr(0,date.toISOString().lastIndexOf(":"));
        }
      }
    },
    c1s2: {
      type : DataTypes.STRING,
      comment : "Tipo intervento"
    },
    c1s3: {
      type : DataTypes.ENUM("URGENTE","EMERGENTE"),
      comment : "Taglio cesareo"
    },
    c1s4: {
      type : DataTypes.DATE,
      comment : "Ultima assunzione cibo",
      get : function(){
        if(this.getDataValue('c1s4')){
          var date = new Date(this.getDataValue('c1s4'));
          return date.toISOString().substr(0,date.toISOString().lastIndexOf(":"));
        }
      }
    },
    c1s5: {
      type : DataTypes.STRING,
      comment : "Complicanze"
    },
    c1s6: {
      type : DataTypes.STRING,
      comment : "Difficoltà tecniche"
    },

    //EPIDURALE
    c2s1 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "EPIDURALE??"
    },
    c2s2 : {
      type : DataTypes.TIME,
      comment : "Inizio estensione blocco"
    },
    c2s3 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Anestesia locale 1"
    },
    c2s3a : {
      type : DataTypes.ENUM("Ropivacaina","Levobupivacaina","Lidocaina","Bubivacaina","Altro"),
      comment : "Farmaco"
    },
    c2s3b : {
      type : DataTypes.FLOAT,
      comment : "Concentrazione (%)"
    },
    c2s3c : {
      type : DataTypes.FLOAT,
      comment : "Volume (ml)"
    },
    c2s4 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Anestesia locale 2"
    },
    c2s4a : {
      type : DataTypes.ENUM("Ropivacaina","Levobupivacaina","Lidocaina","Bubivacaina","Altro"),
      comment : "Farmaco"
    },
    c2s4b : {
      type : DataTypes.FLOAT,
      comment : "Concentrazione (%)"
    },
    c2s4c : {
      type : DataTypes.FLOAT,
      comment : "Volume (ml)"
    },
    c2s5 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Oppioide"
    },
    c2s5a : {
      type : DataTypes.ENUM("Sufentanil","Morfina"),
      comment : "Farmaco"
    },
    c2s5b : {
      type : DataTypes.FLOAT,
      comment : "Quantità (mcg)"
    },
    //FINE EPIDURALE

    //Subaracnoidea
    c3s1 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Subaracnoidea??"
    },
    c3s2a : {
      type : DataTypes.ENUM("Nessuno","L1-L2","L2-L3","L3-L4","Altro"),
      comment : "Interspazio"
    },
    c3s2b : {
      type : DataTypes.ENUM("Nessuno","16G","18G"),
      comment : "Ago"
    },
    c3s3 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Anestesia locale 1"
    },
    c3s3a : {
      type : DataTypes.ENUM("Ropivacaina","Levobupivacaina","Lidocaina","Bubivacaina","Altro"),
      comment : "Farmaco"
    },
    c3s3b : {
      type : DataTypes.FLOAT,
      comment : "Concentrazione (%)"
    },
    c3s3c : {
      type : DataTypes.FLOAT,
      comment : "Volume (ml)"
    },
    c3s4 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Oppioide 1"
    },
    c3s4a : {
      type : DataTypes.ENUM("Sufentanil","Morfina"),
      comment : "Farmaco"
    },
    c3s4b : {
      type : DataTypes.FLOAT,
      comment : "Quantità (mcg)"
    },
    c3s4c : {
      type : DataTypes.FLOAT,
      comment : "Volume (ml)"
    },
    c3s5 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Oppioide 2"
    },
    c3s5a : {
      type : DataTypes.ENUM("Sufentanil","Morfina"),
      comment : "Farmaco"
    },
    c3s5b : {
      type : DataTypes.FLOAT,
      comment : "Quantità (mcg)"
    },
    c3s5c : {
      type : DataTypes.FLOAT,
      comment : "Volume (ml)"
    },
    //FINE Subaracnoidea

    //Generale
    c4s1 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Generale"
    },
    c4s2 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "Maschera"
    },
    c4s2a : {
      type : DataTypes.INTEGER,
      comment : "LMA (n)"
    },
    c4s3 : {
      type : DataTypes.ENUM("Si","No"),
      comment : "IOT"
    },
    c4s3a : {
      type : DataTypes.INTEGER,
      comment : "Tubo"
    },
    c4s4 : {
      type : DataTypes.ENUM("1","2","3","4"),
      comment : "Cormack"
    },
    c4s5 : {
      type : DataTypes.STRING,
      comment : "Presidi IOT difficili"
    },
    c4s6 : {
      type : DataTypes.ENUM("Spontanea","Meccanica"),
      comment : "Ventilazione"
    },
    c4s7 : {
      type : DataTypes.ENUM("Nessuno","SUCCINILCONINA","ROCURONIO","CISATRACURIO","VECURONIO"),
      comment : "Miorilassante"
    },

    //FINE Generale

    //NOTE
    c5: {
      type : DataTypes.STRING,
      comment : "Note"
    },

  },
  {
    classMethods: {
      associate: function(models) {
        Anestesia.belongsTo(models.Patient);
        Anestesia.belongsTo(models.Doctor, {as : "Anestesista"});
        Anestesia.belongsTo(models.Doctor, {as : "Ginecologo"});
      }
    }
  });

  return Anestesia;
};
