const { STRING, DECIMAL, TEXT, INTEGER } = require("sequelize");
const db = require("../db");

const Gift = db.define("gift", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: DECIMAL(10, 2),
    validate: {
      min: 0,
    },
    allowNull: false,
  },
  description: {
    type: TEXT,
  },
  image_url: {
    type: STRING,
  },
  listingId:{
    type: INTEGER
  },
  url:{
    type: TEXT,
    unique: true
  }
});

module.exports = Gift;
