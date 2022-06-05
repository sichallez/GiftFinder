const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  models: { User },
} = require("../db");
require("dotenv").config();

const REDIRECT_URI = process.env.REDIRECT_URI;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: REDIRECT_URI,
      },
      async function (token, refreshToken, profile, done) {
        profile = profile._json;
        try {
          const user = await User.findOrCreate({
            where: { email: profile.email },
            defaults: {
              passportId: profile.sub,
              firstName: profile.given_name,
              lastName: profile.family_name,
              email: profile.email,
            },
          });
          done(null, user);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  User.findById(userId).then(function (user) {
    done(null, user);
  });
});
