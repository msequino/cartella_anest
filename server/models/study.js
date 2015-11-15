"use strict";

module.exports = function(sequelize, DataTypes) {
  var Study = sequelize.define("Study", {
    title: DataTypes.STRING
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
