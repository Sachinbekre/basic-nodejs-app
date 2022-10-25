const { DataTypes } = require("sequelize");
const sequelize = require("../utils/mydatabase");

const Category = sequelize.define(
    'categories',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: "categories" }
  );
  
  module.exports = Category;