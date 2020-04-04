const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// indicating type of strategy to be used with passport
passport.use(new LocalStrategy(
  //LocalStrategy expects to find credentials in parameters named username and password, but you can change the defaults below (to email)
  {
    // passReqToCallback : true,
    usernameField: 'email',
    // passwordField: 'password'
  },
  function(email, password, done) {
    // When a user tries to sign in, check the database for a record with this email
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(user) {
      // If no user record exists with that email, return the following message
      if (!user) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If password incorrect, return below message
      else if (!user.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user data
      return done(null, user);
    });
  }
));

//Once user logins in, every other request will use a cookie that identifies the session
//passport will serialize and deserialize user instances to and from the session to support login sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  //need findById? method?
  done(null, obj);
});

module.exports = passport;
