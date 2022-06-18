//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Wishlist = require("./models/Wishlist");
const Gift = require("./models/Gift");
const Group = require("./models/Group");
const UserGroup = require("./models/UserGroup");
const WishlistGroup = require("./models/WishlistGroup")
const Idea = require("./models/Idea")

//associations could go here!


//a wishlist belongs to one user
//a user can have one wishlist --- can have many if time to implement

Wishlist.belongsTo(User);
User.hasOne(Wishlist); //hasMany

//a wishlist has many gifts
//gifts can belong to many wishlist
Wishlist.hasMany(Gift);
Gift.belongsTo(Wishlist);

// A user belongs to many groups
// A group have many users
User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

// A wishlist may belong to many groups
// A group may have many wishlists
Wishlist.belongsToMany(Group, { through: WishlistGroup });
Group.belongsToMany(Wishlist, { through: WishlistGroup });

module.exports = {
  db,
  models: {
    User,
    Group,
    UserGroup,
    Wishlist,
    Gift,
    WishlistGroup,
    Idea
  },
};
