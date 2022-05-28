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
  image_url2: {
    type: STRING,
  },
  image_url3: {
    type: STRING,
  },
  image_url4: {
    type: STRING,
  },
  stock: {
    type: INTEGER,
  },
  category: {
    type: TEXT,
    allowNull: false,
  },
});

module.exports = Gift;
