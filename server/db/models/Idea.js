const { STRING, DECIMAL, TEXT, INTEGER } = require("sequelize");
const db = require("../db");

const Idea = db.define("idea", {
  name: {
    type: STRING,
  },
  price: {
    type: DECIMAL(10, 2),
  },
  description: {
    type: TEXT,
  },
  image_url: {
    type: STRING,
  },
  url:{
    type: TEXT,
    unique: true
  }
});

module.exports = Idea;