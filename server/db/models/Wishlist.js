const { STRING, BOOLEAN, INTEGER } = require("sequelize");
const db = require("../db");

const Wishlist = db.define("wishlist", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  default:{
    type: BOOLEAN,
    default: false
  },
  userId: {
    type: INTEGER,
  },
  isPrivate: {
    type: BOOLEAN,
    default: true,
  },
  isShared: {
    type: BOOLEAN,
    defaultValue: false,
  },
  isPublic: {
    type: BOOLEAN,
    default: false,
  },
});

module.exports = Wishlist;
