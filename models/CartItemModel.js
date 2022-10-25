const { DataTypes } = require("sequelize");
const sequelize = require("../utils/mydatabase");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = CartItem;
