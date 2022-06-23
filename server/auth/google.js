const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  models: { User },
} = require("../db");
require("dotenv").config();

const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URL;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/callback",
      },
      async function (token, refreshToken, profile, done) {
        profile = profile._json;
        try {
          const user = await User.findOrCreate({
            where: { email: profile.email },
            defaults: {
              username: profile.given_name,
              password: '123',
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
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id, function (err, user) {
    done(err, user);
  });
});
