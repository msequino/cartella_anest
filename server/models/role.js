"use strict";

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define("Role", {
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

  return Role;
};
