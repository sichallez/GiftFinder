const Sequelize = require("sequelize");
const db = require("../db");

const WishlistGroup = db.define("wishlistgroup", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = WishlistGroup;
