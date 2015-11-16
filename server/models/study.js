"use strict";

module.exports = function(sequelize, DataTypes) {
  var Study = sequelize.define("Study", {
    acronym: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    inclusions: DataTypes.STRING,
    exclusions: DataTypes.STRING,
  },
  {
      timestamps : false
  }, {
    classMethods: {
      associate: function(models) {

      }
    },
  });

  return Study;
};
