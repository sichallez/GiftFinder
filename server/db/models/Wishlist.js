const { STRING, BOOLEAN } = require("sequelize");
const db = require("../db");

const Wishlist = db.define("wishlist", {
  name: {
    type: STRING,
    defaultValue: "Default Wishlist",
  },
  default:{
    type: BOOLEAN,
    defaultValue: false
  }
});

module.exports = Wishlist;
