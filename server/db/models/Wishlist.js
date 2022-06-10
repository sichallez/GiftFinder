const { STRING, BOOLEAN, INTEGER } = require("sequelize");
const db = require("../db");

const Wishlist = db.define("wishlist", {
  name: {
    type: STRING,
    allowNull: false
  },
  default:{
    type: BOOLEAN,
    default: false
  },
  userId: {
    type: INTEGER,
  }
});

module.exports = Wishlist;
