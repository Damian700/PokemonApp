const { DataTypes } = require ('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Tipo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};