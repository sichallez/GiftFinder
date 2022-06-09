const Sequelize = require("sequelize");
const db = require("../db");
// const User = require("./User");
// const Group = require("./Group");

const UserGroup = db.define("usergroup", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = UserGroup;
