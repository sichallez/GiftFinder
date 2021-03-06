const router = require("express").Router();
const {
  models: { Group, UserGroup },
} = require("../db");
const User = require("../db/models/User");
const { requireAdmin } = require("./backendProtect");

// Route "/api/group"

router.get("/", async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const usergroups = await UserGroup.findAll({
      where: { userId },
      order: [["id", "ASC"]],
    });
    const groupId = usergroups.map((item) => item.groupId);
    const groups = await Group.findAll({
      where: {
        id: groupId,
      },
    });
    res.send(groups);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const group = await Group.create(req.body);
    await UserGroup.create({ userId, groupId: group.id });
    res.status(201).send(group);
  } catch (err) {
    next(err);
  }
});

router.get("/:groupRouteId", async (req, res, next) => {
  try {
    const groupRouteId = req.params.groupRouteId;    
    const currentGroup = await Group.findOne({
      where: { groupRouteId },
    });
    
    const usergroups = await UserGroup.findAll({
      where: { groupId: currentGroup.id }
    })
    const userId = usergroups.map(item => item.userId);
    const members = await User.findAll({
      where: { id: userId},
    })
    res.send(members);
  } catch (err) {
    next(err);
  }
});

router.get("/getGroup/:groupRouteId", async (req, res, next) => {
  try {       
    const group = await Group.findOne({
      where: { groupRouteId: req.params.groupRouteId },
    });
    
    res.send(group);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id);
    await group.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = await Group.findByPk(req.params.id);
    const updated = await data.update(req.body);
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
