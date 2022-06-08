const router = require("express").Router();
const {
  models: { Wishlist, User, Gift },
} = require("../db");

//return default wishlist of the user
router.get("/default", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const wishlist = await Wishlist.findOne({
      where: {
        userId: user.id,
        default: true
      },
      include:[
        { model: Gift}
      ],
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
        userId: user.id
      },
      include:[
        { model: Gift}
      ],
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
        userId: user.id
      },
      include:[
        { model: Gift}
      ],
    });

    res.send(wishlist);
  } catch (err) {
    if (err.status === 401) {
      res.sendStatus(401);
    } else next(err);
  }
});

module.exports = router;
