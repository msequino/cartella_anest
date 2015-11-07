"use strict";

module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define("Group", {
    title: DataTypes.STRING
  },
  {
      timestamps : false
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return Group;
};
