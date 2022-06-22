const router = require("express").Router();
const { requireLoggedIn } = require("./backendProtect");
const UserGroup = require("../db/models/UserGroup");

// Base route "/api/usergroup"

router.delete("/:id", requireLoggedIn, async (req, res, next) => {
    try {
        const group = await UserGroup.findOne({
            where: {
            userId: req.params.id,
            groupId: req.query.groupId
            }
        });

        await group.destroy();

        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
  });


module.exports = router;
