const { STRING, BOOLEAN, INTEGER } = require("sequelize");
const db = require("../db");

const Giftlist = db.define("giftlist", {
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
  },
  wishlistId: {
    type: INTEGER,
  },
});

module.exports = Giftlist;
