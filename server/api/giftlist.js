const router = require("express").Router();
const {
  models: { Wishlist, User, Gift, Group, UserGroup, WishlistGroup },
} = require("../db");

// Base route "/api/giftlist"
// Wishlist is the list created by me, from my point of view
// Giftlist is the list for other users to view and shop for me, which equals my wishlist, but from other users' point of view.

//return all wishlists of other users that shared with this user, within a specific group
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const allGroup = req.query.allGroup;
    console.log("BACKEND GIFTLISTS", allGroup);
    let giftlists = [];

    allGroup.map(async(group) => {
        const wishlistgroups = await WishlistGroup.findAll({
            where: {
                groupId: group.id,
            },
        });
        const wishlistIds = wishlistgroups.map(item => item.wishlistId);
        const wishlists = await Wishlist.findAll({
            where: {
                id: wishlistIds
            }
        });
        const giftlist = wishlists.filter(item => item.userId !== user.id);
        giftlists.push({groupId: group.id, giftlists: giftlist});
    })
    console.log("BACKEND GIFTLISTS", giftlists);

    // const wishlistgroups = await WishlistGroup.findAll({
    //   where: {
    //     groupId: currentGroupId,
    //   },
    // });
    
    // const wishlistIds = wishlistgroups.map(item => item.wishlistId);
    // const wishlists = await Wishlist.findAll({
    //     where: {
    //         id: wishlistIds
    //     }
    // });
    // // giftlists is the wishlists within current group minus the wishlist of yourself
    // const giftlists = wishlists.filter(item => item.userId !== user.id);
    // res.send(giftlists);
  } catch (err) {
    if (err.status === 401) {
      res.sendStatus(401);
    } else next(err);
  }
});

//return giftlist by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const giftlist = await Wishlist.findOne({
      where: {
        id: req.params.id,
        userId: user.id,
      },
      include: [{ model: Gift }],
    });

    res.send(giftlist);
  } catch (err) {
    if (err.status === 401) {
      res.sendStatus(401);
    } else next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const sharedGroups = req.query.sharedGroups;
    const giftlist = await Wishlist.create(req.body);
    console.log(
      "BACKEND WISHLIST",
      giftlist.isPrivate,
      giftlist.isShared,
      giftlist.isPublic,
      sharedGroups
    );
    console.log("COUNT", await Wishlist.count(), await Group.count());
    if (giftlist.isPublic && giftlist.isShared) {
      // if the giftlist is set to be visible to public
      const totalGroups = await Group.count();
      for (let i = 1; i <= totalGroups; i++) {
        await WishlistGroup.create({ giftlistId: giftlist.id, groupId: i });
      }
    } else if (giftlist.isShared && sharedGroups.length) {
      for (let i = 0; i < sharedGroups.length; i++) {
        await WishlistGroup.create({
          giftlistId: giftlist.id,
          groupId: sharedGroups[i],
        });
      }
    }

    res.status(201).json(giftlist);
  } catch (err) {
    if (err.status === 401) {
      res.sendStatus(401);
    } else next(err);
  }
});

module.exports = router;
