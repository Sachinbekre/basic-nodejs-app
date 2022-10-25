const { DataTypes } = require("sequelize");
const sequelize = require("../utils/mydatabase");

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  quantity:{
    type:DataTypes.INTEGER
  }
});

module.exports = OrderItem;
