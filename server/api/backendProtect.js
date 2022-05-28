const {
  models: { User },
} = require("../db");

// Only logged in user can have access to their API cart
const requireLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "unauthorized" });

    const user = await User.findByToken(token);

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Use this function during development, in order to access API routes in browser without protection
// This dev function generally does nothing, just let the api request skip user verification and jump to the next callback
not_requireLoggedIn = (req, res, next) => {
  try {
    next();
  } catch (err) {
    next(err);
  }
};

// Only Admin has the right to access and modify backend products
const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // If there is no token, return unauthorized
    if (!token) return res.status(401).json({ message: "unauthorized" });

    const user = await User.findByToken(token);
    // If the logged in user is not Admin, return unauthorized
    if (!user.isAdmin) return res.status(401).json({ message: "unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Use this function during development, in order to access API routes in browser WITHOUT protection
// This dev function generally does nothing, just let the api request skip admin verification and jump to the next callback
const not_requireAdmin = (req, res, next) => {
  try {
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  requireLoggedIn,
  requireAdmin,
  not_requireLoggedIn,
  not_requireAdmin,
};
