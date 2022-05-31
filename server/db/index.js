//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Wishlist = require("./models/Wishlist");
const Gift = require("./models/Gift");

//associations could go here!


//a wishlist belongs to one user
//a user can have one wishlist --- can have many if time to implement
//a wishlist has many gifts
//gifts can belong to many wishlist

Wishlist.belongsTo(User);
User.hasOne(Wishlist);

Wishlist.hasMany(Gift);
Gift.belongsTo(Wishlist);

module.exports = {
  db,
  models: {
    User,
    Wishlist,
  },
};
