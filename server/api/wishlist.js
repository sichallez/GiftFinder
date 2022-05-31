const router = require("express").Router();
const {
  models: { Wishlist, User},
} = require("../db");


router.get("/", async (req, res, next) => {
    try{
        const user = await User.findByToken(req.headers.authorization);

        console.log('USER');

        console.log(req.headers);

        const wishlist = await Wishlist.findOne({
          where: {
            userId: user.id
          }
        })


        res.send(wishlist);
      }
      catch(err){
        if (err.status === 401){
          res.sendStatus(401);
        }
        else
          next(err);
      }
});

module.exports = router;
