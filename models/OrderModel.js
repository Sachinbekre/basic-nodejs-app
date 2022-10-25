const { DataTypes } = require("sequelize");
const sequelize = require("../utils/mydatabase");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  }
});

module.exports = Order;
