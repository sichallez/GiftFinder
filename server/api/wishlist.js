const router = require("express").Router();
const {
  models: { Wishlist, User, Gift },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const wishlist = await Wishlist.findOne({
      where: {
        userId: user.id,
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
