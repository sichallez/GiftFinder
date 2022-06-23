const router = require("express").Router();
const {
  models: { Wishlist, User, Gift, Group, WishlistGroup },
} = require("../db");
const { not_requireLoggedIn } = require("./backendProtect");

// Base route "/api/wishlist"

//return default wishlist of the user
router.get("/default", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const wishlist = await Wishlist.findOne({
      where: {
        userId: user.id,
        default: true,
      },
      include: [{ model: Gift }],
    });

    res.send(wishlist);
  } catch (err) {
    if (err.status === 401) {
      res.sendStatus(401);
    } else next(err);
  }
});

//return all wishlists of the user
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const wishlists = await Wishlist.findAll({
      where: {
        userId: user.id,
      },
      include: [{ model: Gift }],
    });

    res.send(wishlists);
  } catch (err) {
    if (err.status === 401) {
      res.sendStatus(401);
    } else next(err);
  }
});

//return all wishlists of the specified user
router.get("/all/", async (req, res, next) => {
  try {
    const wishlists = await Wishlist.findAll({
      include: [{ model: Gift }],
    });

    res.send(wishlists);
  } catch (err) {
    if (err.status === 401) {
      res.sendStatus(401);
    } else next(err);
  }
});

//return wishlist by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const wishlist = await Wishlist.findOne({
      where: {
        id: req.params.id,
        userId: user.id,
      },
      include: [{ model: Gift }],
    });

    res.send(wishlist);
  } catch (err) {
    if (err.status === 401) {
      res.sendStatus(401);
    } else next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = await Wishlist.findByPk(req.params.id);
    const updated = await data.update(req.body);
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const sharedGroups = req.query.sharedGroups;
    const wishlist = await Wishlist.create(req.body);
    console.log(
      "BACKEND WISHLIST",
      wishlist.isPrivate,
      wishlist.isShared,
      wishlist.isPublic,
      sharedGroups
    );
    console.log("COUNT", await Wishlist.count(), await Group.count());
    if (wishlist.isPublic && wishlist.isShared) {
      // if the wishlist is set to be visible to public
      const totalGroups = await Group.count();
      for (let i = 1; i <= totalGroups; i++) {
        await WishlistGroup.create({ wishlistId: wishlist.id, groupId: i });
      }
    } else if (wishlist.isShared && sharedGroups.length) {
      for (let i = 0; i < sharedGroups.length; i++) {
        await WishlistGroup.create({
          wishlistId: wishlist.id,
          groupId: sharedGroups[i],
        });
      }
    }

    res.status(201).json(wishlist);
  } catch (err) {
    if (err.status === 401) {
      res.sendStatus(401);
    } else next(err);
  }
});

module.exports = router;
