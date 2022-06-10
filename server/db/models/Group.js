const { STRING } = require("sequelize");
const db = require("../db");
const { generateString } = require("../../../utils");

const Group = db.define("group", {
  name: {
    type: STRING,
    unique: true,
  },
  groupRouteId: {
    type: STRING,
    unique: true,
  },
  avatar: {
    type: STRING(1000)
  },
  status: {
    type: STRING,
    defaultValue: "active",
  },
});

Group.prototype.generateRouteId = function() {
    this.groupRouteId = generateString(5);
}


module.exports = Group;