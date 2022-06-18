const router = require("express").Router();
const axios = require("axios");
const {
  models: { Gift },
} = require("../db");
const { requireLoggedIn } = require("./backendProtect");

// Route "/api/gifts"

router.delete("/:id", requireLoggedIn, async (req, res, next) => {
  try {
    const gift = await Gift.findByPk(req.params.id);
    await gift.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log('req', req.body);
    const gift = await Gift.create({ ...req.body });
    console.log(gift);
    res.send(gift).sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = await Gift.findByPk(req.params.id);
    const updated = await data.update(req.body);
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    //console.log("BACKEND BACKEND", req.query);
    const response = await axios.get(
      "https://openapi.etsy.com/v2/listings/active?keywords=" +
        req.query.q +
        "&limit=50&min_price=" +
        req.query.minPrice +
        "&max_price=" +
        req.query.maxPrice +
        "&includes=Images&sort_on=score&api_key=dggfhwkwf5yl2hsyp2mhwn38"
    );
    const gifts = response.data;
    res.json(gifts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const gift = await Gift.findByPk(req.params.id);
    res.send(gift).sendStatus(204);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
