const router = require('express').Router()
module.exports = router

// API routes "/api"

router.use('/users', require('./users'));
router.use("/gifts", require("./gifts"));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
