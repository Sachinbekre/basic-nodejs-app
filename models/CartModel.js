const { DataTypes } = require("sequelize");
const sequelize = require("../utils/mydatabase");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
});

module.exports = Cart;
