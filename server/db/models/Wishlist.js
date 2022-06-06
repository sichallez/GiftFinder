const { STRING, INTEGER } = require("sequelize");
const db = require("../db");

const Wishlist = db.define("wishlist", {
  name: {
    type: STRING,
    allowNull: false,
    default: "Wishlist",
  }
});

module.exports = Wishlist;
