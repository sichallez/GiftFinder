const { STRING, BOOLEAN } = require("sequelize");
const db = require("../db");

const Wishlist = db.define("wishlist", {
  name: {
    type: STRING,
    allowNull: false
  },
  default:{
    type: BOOLEAN,
    default: false
  }
});

module.exports = Wishlist;
